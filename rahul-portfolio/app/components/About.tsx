export default function About() {
    return (
      <section id="about" className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">About Me</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                I'm a full-stack web developer with 4+ years of experience building production-ready web applications.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Specializing in healthcare marketing platforms, real estate CMS systems, and e-commerce solutions.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                I love working with modern technologies like Next.js, Sanity CMS, Tailwind CSS, and TypeScript.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Skills</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Frontend</h4>
                  <p className="text-gray-600">Next.js, React, TypeScript, Tailwind CSS, Framer Motion</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Backend & CMS</h4>
                  <p className="text-gray-600">Sanity CMS, Node.js, REST APIs, GraphQL</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Tools & Platforms</h4>
                  <p className="text-gray-600">Vercel, GitHub, Figma, VS Code, Terminal</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Other</h4>
                  <p className="text-gray-600">SEO, Performance Optimization, Accessibility</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  