import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/FooterClean";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { RotateCcw } from "lucide-react";

const Settings = () => {
  const { toast } = useToast();
  
  // Default theme colors (from index.css)
  const defaultColors = {
    primary: { h: 0, s: 65, l: 51 },
    secondary: { h: 174, s: 100, l: 15 },
  };

  const [colors, setColors] = useState(() => {
    const saved = localStorage.getItem('theme-colors');
    return saved ? JSON.parse(saved) : defaultColors;
  });

  const handleColorChange = (colorType, channel, value) => {
    setColors(prev => ({
      ...prev,
      [colorType]: {
        ...prev[colorType],
        [channel]: parseInt(value)
      }
    }));
  };

  const applyTheme = () => {
    const root = document.documentElement;
    
    // Apply primary color
    root.style.setProperty('--primary', `${colors.primary.h} ${colors.primary.s}% ${colors.primary.l}%`);
    root.style.setProperty('--primary-light', `${colors.primary.h} ${colors.primary.s}% ${colors.primary.l + 14}%`);
    root.style.setProperty('--primary-dark', `${colors.primary.h} ${colors.primary.s}% ${colors.primary.l - 11}%`);
    
    // Apply secondary color
    root.style.setProperty('--secondary', `${colors.secondary.h} ${colors.secondary.s}% ${colors.secondary.l}%`);
    root.style.setProperty('--secondary-light', `${colors.secondary.h} ${colors.secondary.s - 40}% ${colors.secondary.l + 20}%`);
    root.style.setProperty('--secondary-dark', `${colors.secondary.h} ${colors.secondary.s}% ${colors.secondary.l - 5}%`);
    
    // Update gradients
    root.style.setProperty('--gradient-primary', `linear-gradient(135deg, hsl(${colors.primary.h} ${colors.primary.s}% ${colors.primary.l}%), hsl(${colors.primary.h} ${colors.primary.s}% ${colors.primary.l + 14}%))`);
    root.style.setProperty('--gradient-secondary', `linear-gradient(135deg, hsl(${colors.secondary.h} ${colors.secondary.s}% ${colors.secondary.l}%), hsl(${colors.secondary.h} ${colors.secondary.s - 40}% ${colors.secondary.l + 20}%))`);
    root.style.setProperty('--gradient-hero', `linear-gradient(135deg, hsl(${colors.primary.h} ${colors.primary.s}% ${colors.primary.l}% / 0.95), hsl(${colors.secondary.h} ${colors.secondary.s}% ${colors.secondary.l}% / 0.95))`);
  };

  const saveTheme = () => {
    localStorage.setItem('theme-colors', JSON.stringify(colors));
    applyTheme();
    toast({
      title: "Theme Saved",
      description: "Your custom theme colors have been saved successfully.",
    });
  };

  const resetTheme = () => {
    setColors(defaultColors);
    localStorage.removeItem('theme-colors');
    
    // Reset to default CSS variables
    const root = document.documentElement;
    root.style.removeProperty('--primary');
    root.style.removeProperty('--primary-light');
    root.style.removeProperty('--primary-dark');
    root.style.removeProperty('--secondary');
    root.style.removeProperty('--secondary-light');
    root.style.removeProperty('--secondary-dark');
    root.style.removeProperty('--gradient-primary');
    root.style.removeProperty('--gradient-secondary');
    root.style.removeProperty('--gradient-hero');
    
    toast({
      title: "Theme Reset",
      description: "Theme colors have been reset to defaults.",
    });
  };

  // Apply theme on mount and when colors change
  useEffect(() => {
    applyTheme();
  }, [colors]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Customize your app theme and preferences</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Theme Customization</CardTitle>
              <CardDescription>
                Adjust the primary and secondary colors to create your perfect theme. Changes are previewed in real-time.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Primary Color */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-lg font-semibold">Primary Color</Label>
                  <div 
                    className="w-16 h-16 rounded-lg border-2 border-border shadow-medium"
                    style={{ backgroundColor: `hsl(${colors.primary.h}, ${colors.primary.s}%, ${colors.primary.l}%)` }}
                  />
                </div>
                
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="primary-h">Hue: {colors.primary.h}°</Label>
                    <input
                      id="primary-h"
                      type="range"
                      min="0"
                      max="360"
                      value={colors.primary.h}
                      onChange={(e) => handleColorChange('primary', 'h', e.target.value)}
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="primary-s">Saturation: {colors.primary.s}%</Label>
                    <input
                      id="primary-s"
                      type="range"
                      min="0"
                      max="100"
                      value={colors.primary.s}
                      onChange={(e) => handleColorChange('primary', 's', e.target.value)}
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="primary-l">Lightness: {colors.primary.l}%</Label>
                    <input
                      id="primary-l"
                      type="range"
                      min="0"
                      max="100"
                      value={colors.primary.l}
                      onChange={(e) => handleColorChange('primary', 'l', e.target.value)}
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Secondary Color */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-lg font-semibold">Secondary Color</Label>
                  <div 
                    className="w-16 h-16 rounded-lg border-2 border-border shadow-medium"
                    style={{ backgroundColor: `hsl(${colors.secondary.h}, ${colors.secondary.s}%, ${colors.secondary.l}%)` }}
                  />
                </div>
                
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="secondary-h">Hue: {colors.secondary.h}°</Label>
                    <input
                      id="secondary-h"
                      type="range"
                      min="0"
                      max="360"
                      value={colors.secondary.h}
                      onChange={(e) => handleColorChange('secondary', 'h', e.target.value)}
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="secondary-s">Saturation: {colors.secondary.s}%</Label>
                    <input
                      id="secondary-s"
                      type="range"
                      min="0"
                      max="100"
                      value={colors.secondary.s}
                      onChange={(e) => handleColorChange('secondary', 's', e.target.value)}
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="secondary-l">Lightness: {colors.secondary.l}%</Label>
                    <input
                      id="secondary-l"
                      type="range"
                      min="0"
                      max="100"
                      value={colors.secondary.l}
                      onChange={(e) => handleColorChange('secondary', 'l', e.target.value)}
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button onClick={saveTheme} className="flex-1">
                  Save Theme
                </Button>
                <Button onClick={resetTheme} variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset to Default
                </Button>
              </div>

              {/* Preview Section */}
              <div className="pt-4 border-t border-border">
                <Label className="text-lg font-semibold mb-4 block">Preview</Label>
                <div className="space-y-3">
                  <Button className="w-full">Primary Button</Button>
                  <Button variant="secondary" className="w-full">Secondary Button</Button>
                  <div className="p-4 rounded-lg gradient-primary text-primary-foreground">
                    Gradient Background
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;
