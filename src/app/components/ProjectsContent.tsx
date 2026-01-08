import { ExternalLink, Github } from 'lucide-react';
import { motion } from 'motion/react';

const projects = [
  {
    id: 1,
    title: 'OS-Style Portfolio',
    description: 'A desktop-like portfolio website with file/folder system, terminal, and login interface, themed like Ubuntu light version.',
    tech: ['React', 'Tailwind', 'JavaScript', 'Figma'],
    image: 'https://images.unsplash.com/photo-1581091215361-1d7c0b0f41d2?w=400&h=250&fit=crop',
    github: 'https://github.com',
    live: 'https://example.com',
  },
  {
    id: 2,
    title: 'Food Delivery Web App',
    description: 'Platform for ordering food with kitchen-wise menu, order tracking, and session-based user management.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=250&fit=crop',
    github: 'https://github.com',
    live: 'https://example.com',
  },
  {
    id: 3,
    title: 'LinkedIn Job Scraper',
    description: 'Python-based automation tool that scrapes LinkedIn job postings and filters them based on criteria.',
    tech: ['Python', 'Selenium', 'BeautifulSoup', 'Pandas'],
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&fit=crop',
    github: 'https://github.com',
  },
  {
    id: 4,
    title: 'Card Detection System',
    description: 'Computer vision system that detects and identifies playing cards using OpenCV.',
    tech: ['Python', 'OpenCV', 'NumPy', 'Machine Learning'],
    image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&h=250&fit=crop',
    github: 'https://github.com',
  },
  {
    id: 5,
    title: 'Cricket Player Database System',
    description: 'Java-based system to manage cricket player records, stats, and performance history.',
    tech: ['Java', 'MySQL', 'Swing'],
    image: 'https://images.unsplash.com/photo-1508796079212-a4ef53d8f3a6?w=400&h=250&fit=crop',
    github: 'https://github.com',
  },
  {
    id: 6,
    title: 'Red-Black Tree Inventory System',
    description: 'C++ implementation of Red-Black Tree for managing product inventory efficiently.',
    tech: ['C++', 'Data Structures', 'STL'],
    image: 'https://images.unsplash.com/photo-1590608897129-79a9b1791d3a?w=400&h=250&fit=crop',
    github: 'https://github.com',
  },
];


export function ProjectsContent() {
  return (
    <div className="p-6 space-y-6">
      <div className="mb-4">
        <h2 className="mb-1">Featured Projects</h2>
        <p className="text-sm text-muted-foreground">
          A selection of projects I've built with passion and care
        </p>
      </div>

      <div className="space-y-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-muted/30 rounded-lg overflow-hidden border border-border hover:border-primary/30 transition-colors"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-3">
              <h3>{project.title}</h3>
              <p className="text-sm text-muted-foreground">{project.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-primary/10 text-primary rounded text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="size-4" />
                  Code
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  <ExternalLink className="size-4" />
                  Live Demo
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
