import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { ThemeToggle } from '../components/ThemeToggle';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import {
  ClipboardList,
  Database,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export function Landing() {
  const features = [
    {
      icon: <ClipboardList className="h-10 w-10 text-blue-500" />,
      title: "Easy Data Entry",
      description: "Simple and intuitive form to quickly record field data with minimal effort."
    },
    {
      icon: <Database className="h-10 w-10 text-green-500" />,
      title: "Secure Storage",
      description: "All your data is safely stored and organized in one central location."
    },
    {
      icon: <CheckCircle2 className="h-10 w-10 text-purple-500" />,
      title: "Data Validation",
      description: "Built-in validation ensures your data is accurate and complete."
    }
  ];

  const benefits = [
    "Quick and easy data entry",
    "Organized data records",
    "Easy to update and manage records",
    "Simple interface for field use",
    "Responsive design for all devices"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <ImageWithFallback src="/logo/logo.jpeg" alt="CTS Logo" className="h-8 w-8 rounded-full" />
              <span className="font-bold text-3xl">CTS</span>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link to="/login">
                <Button>Sign In</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] dark:bg-grid-slate-400/[0.05] bg-[size:50px_50px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
              Record Your Field Data
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                Quickly and Easily
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-300">
              A simple and efficient tool for recording and managing field data, including non-invoice data. 
              Perfect for collecting data on-site with an easy-to-use interface.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-500">
              <Link to="/dashboard">
                <Button size="lg" className="text-lg px-8 group">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 animate-in fade-in slide-in-from-bottom-7 duration-1000 delay-700">
            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">✓</div>
                <p className="text-muted-foreground">Simple Form</p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">✓</div>
                <p className="text-muted-foreground">Fast Entry</p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">✓</div>
                <p className="text-muted-foreground">Organized Data</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Key Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to record and manage your field data efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-primary transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Why Use This Tool?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Designed specifically for field data collection with simplicity and efficiency in mind.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-base">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <Card className="border-2 lg:order-first">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="h-6 w-6 text-primary" />
                  How It Works
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
                  <div>
                    <h4 className="font-semibold">Enter Data</h4>
                    <p className="text-sm text-muted-foreground">Fill in the simple form with your field data</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
                  <div>
                    <h4 className="font-semibold">Save Record</h4>
                    <p className="text-sm text-muted-foreground">Your data is securely stored in the system</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
                  <div>
                    <h4 className="font-semibold">Manage Records</h4>
                    <p className="text-sm text-muted-foreground">View, edit, or delete your data anytime</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Start?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Begin recording your field data and non-invoice data today. It's simple and free.
          </p>
          <Link to="/login">
            <Button size="lg" variant="secondary" className="text-lg px-8 group">
              Go to Data Records
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <ClipboardList className="h-6 w-6 text-primary" />
              <span className="font-bold">Field Data</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 Field Data Recorder. Simple and efficient.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
