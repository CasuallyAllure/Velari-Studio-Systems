import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const repoRoot = path.resolve(import.meta.dirname, '../../../..');
const outputRoot = path.join(repoRoot, 'docs/internal/phase-0-baseline/generated');
const assetRoots = ['public', 'img', 'fonts'];
const referenceRoots = ['src', 'public/concepts', 'index.html'];

const textExtensions = new Set([
  '.css', '.html', '.js', '.jsx', '.json', '.md', '.mjs', '.sql', '.ts', '.tsx', '.txt', '.xml',
]);
const imageExtensions = new Set(['.avif', '.gif', '.jpeg', '.jpg', '.png', '.svg', '.webp']);
const videoExtensions = new Set(['.m4v', '.mov', '.mp4', '.webm']);
const audioExtensions = new Set(['.aac', '.m4a', '.mp3', '.ogg', '.wav']);
const fontExtensions = new Set(['.otf', '.ttf', '.woff', '.woff2']);

async function walk(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  const stat = await fs.stat(absolutePath);
  if (stat.isFile()) return [relativePath];
  const entries = await fs.readdir(absolutePath, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => walk(path.join(relativePath, entry.name))));
  return nested.flat();
}

function classify(extension) {
  if (imageExtensions.has(extension)) return 'image';
  if (videoExtensions.has(extension)) return 'video';
  if (audioExtensions.has(extension)) return 'audio';
  if (fontExtensions.has(extension)) return 'font';
  if (extension === '.html') return 'html';
  if (extension === '.css') return 'css';
  if (extension === '.js') return 'javascript';
  if (extension === '.zip') return 'archive';
  if (extension === '.glb' || extension === '.gltf') return '3d';
  return extension.slice(1) || 'file';
}

function run(command, args) {
  try {
    return execFileSync(command, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return '';
  }
}

function mediaMetadata(absolutePath, extension) {
  if (imageExtensions.has(extension) && extension !== '.svg') {
    const output = run('/usr/bin/sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', absolutePath]);
    const width = output.match(/pixelWidth:\s*(\d+)/)?.[1] ?? '';
    const height = output.match(/pixelHeight:\s*(\d+)/)?.[1] ?? '';
    return { dimensions: width && height ? `${width}x${height}` : '', duration: '' };
  }

  if (videoExtensions.has(extension) || audioExtensions.has(extension)) {
    const output = run('/opt/homebrew/bin/ffprobe', [
      '-v', 'error',
      '-show_entries', 'format=duration:stream=width,height',
      '-of', 'json',
      absolutePath,
    ]);
    if (!output) return { dimensions: '', duration: '' };
    try {
      const parsed = JSON.parse(output);
      const visual = parsed.streams?.find((stream) => stream.width && stream.height);
      const duration = Number(parsed.format?.duration);
      return {
        dimensions: visual ? `${visual.width}x${visual.height}` : '',
        duration: Number.isFinite(duration) ? duration.toFixed(3) : '',
      };
    } catch {
      return { dimensions: '', duration: '' };
    }
  }

  if (extension === '.svg') {
    const content = run('/usr/bin/head', ['-c', '4096', absolutePath]);
    const viewBox = content.match(/viewBox=["']([^"']+)["']/)?.[1] ?? '';
    const width = content.match(/\bwidth=["']([^"']+)["']/)?.[1] ?? '';
    const height = content.match(/\bheight=["']([^"']+)["']/)?.[1] ?? '';
    return { dimensions: viewBox || (width && height ? `${width}x${height}` : ''), duration: '' };
  }

  return { dimensions: '', duration: '' };
}

function intendedDestination(relativePath) {
  if (relativePath.startsWith('public/assets/scrollworld/')) return 'Homepage hero media; future HomepageHero';
  if (relativePath.startsWith('public/assets/services-orbit/')) return 'Services hub/showreel or internal archive';
  if (relativePath.startsWith('public/assets/showcase/concepts/')) return 'Work entry and related Industry page';
  if (relativePath.startsWith('public/assets/showcase/')) return 'Work/Industries migration review or internal archive';
  if (relativePath.startsWith('public/concepts/')) return 'Legacy concept compatibility until Work redirects activate';
  if (relativePath.startsWith('fonts/')) return 'Shared design-system font assets';
  if (relativePath.startsWith('img/')) return 'Legacy or active homepage media; reference review required';
  return 'Review during owning component migration';
}

function attribution(relativePath) {
  if (/scrollworld|sfbay|skyline|map|geometr/i.test(relativePath)) {
    return 'Review OSM/USGS attribution; current footer credits both sources';
  }
  return '';
}

function publicUrl(relativePath) {
  if (relativePath.startsWith('public/')) return `/${relativePath.slice('public/'.length)}`;
  if (relativePath.startsWith('img/') || relativePath.startsWith('fonts/')) return `/${relativePath}`;
  return '';
}

await fs.mkdir(outputRoot, { recursive: true });

const referenceFiles = [];
for (const root of referenceRoots) {
  try {
    referenceFiles.push(...await walk(root));
  } catch {
    // Optional reference roots may not exist in every checkout.
  }
}

const referenceCorpus = [];
for (const relativePath of referenceFiles) {
  if (!textExtensions.has(path.extname(relativePath).toLowerCase())) continue;
  referenceCorpus.push({
    relativePath,
    content: await fs.readFile(path.join(repoRoot, relativePath), 'utf8'),
  });
}

const assetPaths = [];
for (const root of assetRoots) {
  try {
    assetPaths.push(...await walk(root));
  } catch {
    // Keep collection repeatable if an optional asset root is absent.
  }
}

const assets = [];
const hashes = new Map();
for (const relativePath of assetPaths.sort()) {
  const absolutePath = path.join(repoRoot, relativePath);
  const extension = path.extname(relativePath).toLowerCase();
  const stat = await fs.stat(absolutePath);
  const bytes = await fs.readFile(absolutePath);
  const sha256 = createHash('sha256').update(bytes).digest('hex');
  const metadata = mediaMetadata(absolutePath, extension);
  const url = publicUrl(relativePath);
  const basename = path.basename(relativePath);
  const matchTokens = [url, relativePath, basename].filter(Boolean);
  const references = referenceCorpus
    .filter(({ content }) => matchTokens.some((token) => content.includes(token)))
    .map(({ relativePath: source }) => source);

  if (!hashes.has(sha256)) hashes.set(sha256, []);
  hashes.get(sha256).push(relativePath);

  assets.push({
    path: relativePath,
    publicUrl: url,
    type: classify(extension),
    bytes: stat.size,
    dimensions: metadata.dimensions,
    durationSeconds: metadata.duration,
    references,
    attribution: attribution(relativePath),
    intendedDestination: intendedDestination(relativePath),
    orphanCandidate: references.length === 0,
    deletionRisk: references.length > 0 ? 'High' : 'Medium—generated, experimental, or dynamically referenced assets require manual review',
    sha256,
  });
}

const duplicateGroups = [...hashes.entries()]
  .filter(([, paths]) => paths.length > 1)
  .map(([sha256, paths]) => ({ sha256, paths }));

const tsvHeader = [
  'path', 'public_url', 'type', 'bytes', 'dimensions', 'duration_seconds', 'reference_count',
  'references', 'duplicate_group_size', 'attribution', 'orphan_candidate', 'intended_destination',
  'deletion_risk', 'sha256',
];
const tsvRows = assets.map((asset) => {
  const duplicateGroupSize = hashes.get(asset.sha256)?.length ?? 1;
  return [
    asset.path,
    asset.publicUrl,
    asset.type,
    asset.bytes,
    asset.dimensions,
    asset.durationSeconds,
    asset.references.length,
    asset.references.join(';'),
    duplicateGroupSize,
    asset.attribution,
    asset.orphanCandidate,
    asset.intendedDestination,
    asset.deletionRisk,
    asset.sha256,
  ].map((value) => String(value).replaceAll('\t', ' ').replaceAll('\n', ' ')).join('\t');
});

await fs.writeFile(path.join(outputRoot, 'asset-manifest.tsv'), `${tsvHeader.join('\t')}\n${tsvRows.join('\n')}\n`);
await fs.writeFile(path.join(outputRoot, 'asset-manifest.json'), `${JSON.stringify(assets, null, 2)}\n`);
await fs.writeFile(path.join(outputRoot, 'duplicate-assets.json'), `${JSON.stringify(duplicateGroups, null, 2)}\n`);

const summary = {
  generatedAt: new Date().toISOString(),
  assetRoots,
  assetCount: assets.length,
  totalBytes: assets.reduce((total, asset) => total + asset.bytes, 0),
  byType: Object.fromEntries(
    [...new Set(assets.map((asset) => asset.type))]
      .sort()
      .map((type) => [type, assets.filter((asset) => asset.type === type).length]),
  ),
  orphanCandidates: assets.filter((asset) => asset.orphanCandidate).length,
  duplicateGroups: duplicateGroups.length,
  caveat: 'Orphan status is static-reference evidence only. Dynamic, generated, source, and experimental assets require manual review before deletion.',
};

await fs.writeFile(path.join(outputRoot, 'asset-summary.json'), `${JSON.stringify(summary, null, 2)}\n`);
console.log(JSON.stringify(summary, null, 2));
