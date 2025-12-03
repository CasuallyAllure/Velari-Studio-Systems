import { ThemeProvider } from './features/theme/ThemeProvider';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/homepage/HeroSection';
import { WhatWeBuildSection } from './components/homepage/WhatWeBuildSection';
import { PackagesSection } from './components/homepage/PackagesSection';
import { HowItWorksSection } from './components/homepage/HowItWorksSection';
import { DemoSection } from './components/homepage/DemoSection';
import { ContactSection } from './components/homepage/ContactSection';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        
        <main>
          <HeroSection />
          <WhatWeBuildSection />
          <PackagesSection />
          <HowItWorksSection />
          <DemoSection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
