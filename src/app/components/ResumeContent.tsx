import { Download, Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';
import { motion } from 'motion/react';

export function ResumeContent() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center pb-6 border-b border-border">
        <h2 className="mb-2">Sarbeshwor Ghimire</h2>
        <p className="text-muted-foreground mb-4">Full-Stack Developer</p>
        
        <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Mail className="size-4" />
            <span>thisisnogom@gmail.com</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="size-4" />
            <span>BUET, Bangladesh</span>
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-4">
          <a href="https://github.com/sarbeshwor" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Github className="size-5" />
          </a>
          <a href="https://www.linkedin.com/in/nogom/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin className="size-5" />
          </a>
        </div>
      </div>

      {/* Download Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 bg-primary text-primary-foreground rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
      >
        <Download className="size-4" />
        Download PDF Resume
      </motion.button>

      {/* Summary */}
      <div>
        <h3 className="mb-2">Summary</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Passionate full-stack developer and CSE student at Bangladesh University of Engineering and Technology (BUET). 
          With 3+ years of experience, completed 15+ projects and served 20+ clients on Upwork. 
          Specialized in React, TypeScript, and Node.js with a strong focus on creating intuitive user experiences.
        </p>
      </div>

      {/* Experience */}
      <div>
        <h3 className="mb-3">Experience</h3>
        <div className="space-y-4">
          <div className="border-l-2 border-primary pl-4">
            <h4 className="font-medium">Freelance Full-Stack Developer</h4>
            <p className="text-sm text-muted-foreground">Upwork • 2021 - Present</p>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground list-disc list-inside">
              <li>Successfully completed 15+ projects for 20+ clients worldwide</li>
              <li>Built scalable web applications using React, TypeScript, and Node.js</li>
              <li>Maintained 100% client satisfaction with high-quality deliverables</li>
              <li>Profile: upwork.com/freelancers/~010f2b33ffebd2d9d3</li>
            </ul>
          </div>

          <div className="border-l-2 border-secondary pl-4">
            <h4 className="font-medium">Independent Developer</h4>
            <p className="text-sm text-muted-foreground">Various Projects • 2021 - Present</p>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground list-disc list-inside">
              <li>Developed full-stack applications with modern tech stacks</li>
              <li>Implemented responsive designs with React and Tailwind CSS</li>
              <li>Built RESTful APIs and microservices using Node.js</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div>
        <h3 className="mb-3">Skills</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-sm font-medium mb-2">Frontend</p>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Tailwind', 'Next.js'].map((skill) => (
                <span key={skill} className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Backend</p>
            <div className="flex flex-wrap gap-2">
              {['Node.js', 'Python', 'PostgreSQL', 'MongoDB'].map((skill) => (
                <span key={skill} className="px-2 py-1 bg-secondary/10 text-secondary rounded text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Education */}
      <div>
        <h3 className="mb-3">Education</h3>
        <div className="border-l-2 border-muted pl-4">
          <h4 className="font-medium">B.Sc. Computer Science and Engineering</h4>
          <p className="text-sm text-muted-foreground">Bangladesh University of Engineering and Technology (BUET) • 2023 - Present</p>
          <p className="text-sm text-muted-foreground mt-1">Currently in 2nd Year</p>
        </div>
      </div>
    </div>
  );
}
