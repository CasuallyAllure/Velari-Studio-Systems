// Tiny typed pub/sub so PackagesSection can seed the intake chat without
// coupling the two components. Module singleton — no external deps.

type PackageSelectedCallback = (packageId: string) => void;

const listeners = new Set<PackageSelectedCallback>();

export function emitPackageSelected(packageId: string): void {
  for (const cb of listeners) cb(packageId);
}

export function onPackageSelected(cb: PackageSelectedCallback): () => void {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}
