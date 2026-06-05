export default function AboutPage() {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24">
        <h1 className="text-5xl font-bold text-gray-900 mb-8">About Me</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            I'm a full-stack web developer with 4+ years of experience building production-ready web applications.
          </p>
          
          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Experience</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-xl font-bold text-gray-900">Full-Stack Developer</h3>
              <p className="text-gray-600">AdvanceEdge LLC • 2022 - Present</p>
              <p className="text-gray-600 mt-2">Building healthcare marketing platforms with Next.js and Sanity CMS</p>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Skills</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Frontend</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Next.js & React</li>
                <li>• TypeScript</li>
                <li>• Tailwind CSS</li>
                <li>• Framer Motion</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Backend & CMS</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Sanity CMS</li>
                <li>• Node.js</li>
                <li>• REST APIs</li>
                <li>• GraphQL</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
  