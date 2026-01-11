import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Scene3D } from '../three/Scene3D';
import { BootSection } from '../sections/BootSection';
import { ProjectsSection } from '../sections/ProjectsSection';
import { CapabilitiesSection } from '../sections/CapabilitiesSection';
import { ExperienceSection } from '../sections/ExperienceSection';
import { AwardsSection } from '../sections/AwardsSection';
import { ContactSection } from '../sections/ContactSection';
import { SectionNav } from '../navigation/SectionNav';
import { SystemHeader } from '../navigation/SystemHeader';

const SECTIONS = ['Boot', 'Projects', 'Capabilities', 'Experience', 'Awards', 'Contact'];

export const MainWorld = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isBooted, setIsBooted] = useState(false);

  const handleStart = useCallback(() => {
    setIsBooted(true);
    setCurrentSection(1);
  }, []);

  const handleRestart = useCallback(() => {
    setIsBooted(false);
    setCurrentSection(0);
  }, []);

  const navigateToSection = useCallback((index: number) => {
    if (index === 0) {
      handleRestart();
    } else {
      setCurrentSection(index);
      if (!isBooted) setIsBooted(true);
    }
  }, [isBooted, handleRestart]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        if (!isBooted) {
          handleStart();
        } else if (currentSection < SECTIONS.length - 1) {
          setCurrentSection(prev => prev + 1);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        if (currentSection > 0) {
          setCurrentSection(prev => prev - 1);
          if (currentSection === 1) setIsBooted(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection, isBooted, handleStart]);

  // Wheel navigation (throttled)
  useEffect(() => {
    let lastScroll = 0;
    const throttleTime = 1000; // 1 second between section changes

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScroll < throttleTime) return;
      
      if (e.deltaY > 50) {
        if (!isBooted) {
          handleStart();
          lastScroll = now;
        } else if (currentSection < SECTIONS.length - 1) {
          setCurrentSection(prev => prev + 1);
          lastScroll = now;
        }
      } else if (e.deltaY < -50) {
        if (currentSection > 0) {
          setCurrentSection(prev => prev - 1);
          if (currentSection === 1) setIsBooted(false);
          lastScroll = now;
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentSection, isBooted, handleStart]);

  return (
    <div className="relative min-h-screen w-full bg-background overflow-hidden">
      {/* 3D Background */}
      <Scene3D currentSection={currentSection} />
      
      {/* Grid pattern overlay */}
      <div className="fixed inset-0 grid-pattern opacity-30 pointer-events-none" />
      
      {/* System header */}
      {isBooted && (
        <SystemHeader 
          currentSection={SECTIONS[currentSection]}
          sectionIndex={currentSection}
          totalSections={SECTIONS.length}
        />
      )}

      {/* Section navigation */}
      {isBooted && (
        <SectionNav 
          sections={SECTIONS}
          currentSection={currentSection}
          onNavigate={navigateToSection}
        />
      )}

      {/* Content sections */}
      <AnimatePresence mode="wait">
        <BootSection 
          key="boot"
          isVisible={!isBooted}
          onStart={handleStart}
        />
        
        <ProjectsSection 
          key="projects"
          isVisible={isBooted && currentSection === 1}
        />
        
        <CapabilitiesSection 
          key="capabilities"
          isVisible={isBooted && currentSection === 2}
        />
        
        <ExperienceSection 
          key="experience"
          isVisible={isBooted && currentSection === 3}
        />
        
        <AwardsSection 
          key="awards"
          isVisible={isBooted && currentSection === 4}
        />
        
        <ContactSection 
          key="contact"
          isVisible={isBooted && currentSection === 5}
          onRestart={handleRestart}
        />
      </AnimatePresence>

      {/* Mobile section indicator */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2 md:hidden">
        {SECTIONS.slice(isBooted ? 1 : 0).map((_, index) => {
          const actualIndex = isBooted ? index + 1 : index;
          return (
            <button
              key={index}
              onClick={() => navigateToSection(actualIndex)}
              className={`w-2 h-2 rounded-full transition-all ${
                actualIndex === currentSection
                  ? 'bg-primary scale-125'
                  : 'bg-muted-foreground/30'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};
