import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Github, Linkedin, Mail, Download } from 'lucide-react';
import resumePdf from './resume/Harshal Jambhale Resume.pdf';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';

export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [modalProject, setModalProject] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs
      .sendForm('service_w71vk3d', 'template_fi4wxun', form.current, {
        publicKey: 'BsX9oRL395mCOnOWs',
      })
      .then(
        () => {
          toast.success('Message sent successfully! I will get back to you soon.', {
            duration: 4000,
            position: 'top-center',
            style: {
              background: dark ? '#1f2937' : '#fff',
              color: dark ? '#f9fafb' : '#111',
            },
          });
          form.current.reset();
          setIsSending(false);
        },
        (error) => {
          toast.error('Failed to send message. Please try again.', {
            duration: 4000,
            position: 'top-center',
            style: {
              background: dark ? '#1f2937' : '#fff',
              color: dark ? '#f9fafb' : '#111',
            },
          });
          setIsSending(false);
        },
      );
  };

  const projects = [
    {
      id: 1,
      title: 'AI Resume Generator',
      short: 'AI-powered resume creation',
      desc: 'Developed a full-stack AI-powered resume generator using Spring Boot and React to automate resume creation based on user profile data. Integrated OpenAI to generate professional and customizable resume content. Implemented secure and fast PDF resume download functionality with dynamic formatting.',
      tech: ['Spring Boot', 'React', 'OpenAI', 'PDF'],
      github: 'https://github.com/Harshal14753/AI-Based-Resume-Generator',
      live: 'https://ai-resume-generator-frontend-omega.vercel.app'
    },
    {
      id: 2,
      title: 'Chat Verse (Real time communication)',
      short: 'Real-time group chat application',
      desc: 'Developed a real-time group chat application using Spring Boot and React, enabling users to create or join chat rooms and communicate instantly with multiple participants. Implemented WebSocket for real-time messaging and JWT-based authentication for secure access and user identity management.',
      tech: ['Spring Boot', 'React', 'WebSocket', 'MongoDB'],
      github: 'https://github.com/Harshal14753/Chat-Verse',
      live: 'https://chat-verse-frontend-seven.vercel.app'
    },
    {
      id: 3,
      title: 'E-Notes (Note storing app)',
      short: 'Secure note storage with OAuth',
      desc: 'Built a secure web application using Spring Boot and React with JWT token-based authentication, role-based access control, and OAuth login via Google and GitHub. Implemented full CRUD operations with file upload and storage functionality, ensuring secure data handling and user-specific permissions.',
      tech: ['Spring Boot', 'React', 'JWT', 'OAuth', 'MySQL'],
      github: 'https://github.com/Harshal14753/ENotes',
      live: 'https://e-notes-frontend.vercel.app/home'
    }
  ];

  const skills = ['Java', 'Spring Boot', 'REST APIs', 'JWT', 'MySQL', 'MongoDB', 'React', 'Tailwind', 'Git/GitHub', 'GitHub Copilot', 'Docker'];

  const socials = [
    { name: 'GitHub', icon: Github, url: 'https://github.com/Harshal14753' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/harshal-jambhale-3a569027b/' },
    { name: 'Email', icon: Mail, url: 'mailto:harshaljambhale01@gmail' }
  ];

  return (
    <div className={"min-h-screen transition-colors " + (dark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800') }>
      <Toaster />
      <header className="sticky top-0 z-40 backdrop-blur-sm bg-opacity-60" style={{background: dark ? 'rgba(17,24,39,0.6)' : 'rgba(255,255,255,0.6)'}}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-600 to-violet-500 flex items-center justify-center text-white font-extrabold">HJ</div>
            <div>
              <h1 className="text-lg font-semibold">Harshal Jambhale</h1>
              <p className="text-xs text-gray-400">Java | Spring Boot | React</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#about" className="hover:text-indigo-400">About</a>
            <a href="#projects" className="hover:text-indigo-400">Projects</a>
            <a href="#skills" className="hover:text-indigo-400">Skills</a>
            <a href="#contact" className="hover:text-indigo-400">Contact</a>
            <a href={resumePdf} download="Harshal_Jambhale_Resume.pdf" className="flex items-center gap-2 px-3 py-1 rounded-md border hover:bg-gray-100 text-sm"><Download size={16}/> Resume</a>
          </nav>

          <div className="flex items-center gap-3">
            <button aria-label="toggle theme" onClick={() => setDark(!dark)} className="p-2 rounded-md hover:bg-gray-200/30">
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <div className="md:hidden">{/* mobile menu can be added here */}</div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h2 initial={{y:10, opacity:0}} animate={{y:0, opacity:1}} transition={{delay:0.05}} className="text-4xl md:text-5xl font-extrabold leading-tight">Hi, I'm Harshal — building reliable backend services and clean frontends.</motion.h2>
            <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.15}} className="mt-4 text-gray-400 max-w-xl">I focus on Java & Spring Boot for server-side, and React for frontend. I build projects that solve real user problems—file management, secure auth, and small-scale SaaS features.</motion.p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#projects" className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-gradient-to-r from-indigo-600 to-violet-500 text-white font-medium shadow hover:scale-105 transform transition">View Projects</a>
              <a href="#contact" className="inline-flex items-center gap-2 px-5 py-2 rounded-md border border-gray-300 text-sm hover:bg-gray-100">Contact Me</a>
            </div>

{/* Social Map icons */}
            <div className="mt-6 flex gap-4">
              {socials.map(s => (
                <a key={s.name} href={s.url} target="_blank" rel="noreferrer" aria-label={s.name} className={"flex items-center justify-center p-3 rounded-lg transition-all duration-300 hover:scale-110 " + (dark ? 'bg-gray-800 text-gray-100 hover:bg-gray-700 shadow-lg' : 'bg-white text-gray-800 hover:bg-gray-50 shadow-md border border-gray-200')}>
                  <s.icon size={20} strokeWidth={2}/> 
                </a>
              ))}
            </div>

            <div className="mt-8">
              <h4 className="text-sm text-gray-400 uppercase tracking-wide">Top skills</h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {skills.slice(0,6).map(s => (
                  <span key={s} className={"px-3 py-1 rounded-full text-sm font-medium " + (dark ? 'bg-gray-800/60 text-gray-100' : 'bg-white shadow text-gray-800') }>{s}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <motion.div initial={{scale:0.95, opacity:0}} animate={{scale:1, opacity:1}} transition={{delay:0.2}} className={"w-full max-w-md rounded-2xl p-6 " + (dark ? 'bg-gradient-to-br from-gray-800 to-gray-700' : 'bg-white shadow-lg')}>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-3xl font-bold">HJ</div>
                <div>
                  <div className="text-lg font-semibold">Harshal Jambhale</div>
                  <div className="text-sm text-gray-400">Full-stack Developer</div>
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-300">
                <p>Experienced in building REST APIs, authentication systems, and deploying small services. I love clean code and automated tests.</p>
              </div>

              <div className="mt-4 flex gap-3">
                <a href="#contact" className="px-3 py-2 rounded-md bg-indigo-500 text-white text-sm">Hire me</a>
                <a href="#projects" className="px-3 py-2 rounded-md border text-sm">See work</a>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="projects" className="mt-16">
          <h3 className="text-2xl font-semibold">Projects</h3>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map(p => (
              <motion.div key={p.id} whileHover={{y:-6}} className={"rounded-xl p-5 shadow hover:shadow-lg transition transform " + (dark ? 'bg-gray-800' : 'bg-white')}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-semibold text-lg">{p.title}</h4>
                    <p className="text-sm text-gray-400 mt-1">{p.short}</p>
                  </div>
                  <div className="text-xs text-gray-400">{p.tech[0]}</div>
                </div>

                <p className="mt-4 text-sm text-gray-400 line-clamp-3">{p.desc}</p>

                <div className="mt-4 flex items-center gap-2">
                  <button onClick={() => setModalProject(p)} className="text-sm px-3 py-1 rounded-md border">Details</button>
                  <a href={p.github} target="_blank" rel="noreferrer" className="text-sm px-3 py-1 rounded-md border">GitHub</a>
                  <a href={p.live} target="_blank" rel="noreferrer" className="text-sm px-3 py-1 rounded-md border">Live</a>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tech.map(t => <span key={t} className="text-xs px-2 py-1 border rounded text-gray-400">{t}</span>)}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="skills" className="mt-16">
          <h3 className="text-2xl font-semibold">Skills & Tools</h3>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {skills.map(s => (
              <div key={s} className={"p-4 rounded-lg " + (dark ? 'bg-gray-800/70' : 'bg-white shadow')}>
                <div className="font-medium">{s}</div>
                <div className="text-xs text-gray-400 mt-2">Experienced</div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="mt-16 mb-6">
          <h3 className="text-2xl font-semibold">Contact</h3>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={"p-6 rounded-lg " + (dark ? 'bg-gray-800/70' : 'bg-white shadow')}>
              <h4 className="font-semibold">Let's build something together</h4>
              <p className="text-sm text-gray-400 mt-2">Email me at <span className="underline">harshaljambhale01@gmail</span> or use the form to send a message.</p>

              <div className="mt-6 flex flex-col gap-3">
                <div className="flex items-center gap-3 text-sm text-gray-400"><Github size={16}/> <a href="https://github.com/Harshal14753" target="_blank" rel="noreferrer">github.com/Harshal14753</a></div>
                <div className="flex items-center gap-3 text-sm text-gray-400"><Linkedin size={16}/> <a href="https://www.linkedin.com/in/harshal-jambhale-3a569027b/" target="_blank" rel="noreferrer">linkedin.com/in/harshal-jambhale/</a></div>
                <div className="flex items-center gap-3 text-sm text-gray-400"><Mail size={16}/>harshaljambhale01@gmail.com</div>
              </div>
            </div>

            <form ref={form} onSubmit={sendEmail} className={"p-6 rounded-lg " + (dark ? 'bg-gray-800/70' : 'bg-white shadow') }>
              <div className="grid grid-cols-1 gap-3">
                <input required placeholder="Your name" type="text" name="from_name" className={"w-full px-3 py-2 rounded border " + (dark ? 'bg-gray-900 border-gray-700 text-gray-100' : 'bg-white border-gray-300')} />
                <input required placeholder="Your email" type="email" name="from_email" className={"w-full px-3 py-2 rounded border " + (dark ? 'bg-gray-900 border-gray-700 text-gray-100' : 'bg-white border-gray-300')} />
                <textarea required placeholder="Message" name="message" rows={5} className={"w-full px-3 py-2 rounded border " + (dark ? 'bg-gray-900 border-gray-700 text-gray-100' : 'bg-white border-gray-300')} />
                <button type="submit" disabled={isSending} className={"px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition " + (isSending ? 'opacity-50 cursor-not-allowed' : '')}>
                  {isSending ? 'Sending...' : 'Send message'}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className={"py-6 border-t " + (dark ? 'border-gray-700' : 'border-gray-200')}>
        <div className="max-w-6xl mx-auto px-6 text-sm text-gray-400 flex items-center justify-between">
          <div>© {new Date().getFullYear()} Harshal J. — Built with React + Tailwind</div>
          <div className="flex items-center gap-3">
            <a href="https://github.com/Harshal14753" target="_blank" rel="noreferrer" className="text-sm">GitHub</a>
            <a href="https://www.linkedin.com/in/harshal-jambhale-3a569027b/" target="_blank" rel="noreferrer" className="text-sm">LinkedIn</a>
          </div>
        </div>
      </footer>

      {/* Project Modal */}
      <AnimatePresence>
        {modalProject && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <motion.div initial={{y:20}} animate={{y:0}} exit={{y:20}} className={"max-w-2xl w-full p-6 rounded-lg " + (dark ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900')}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-xl font-semibold">{modalProject.title}</h4>
                  <p className="text-sm text-gray-400 mt-1">{modalProject.short}</p>
                </div>
                <button onClick={() => setModalProject(null)} className="text-sm px-3 py-1 border rounded">Close</button>
              </div>

              <p className="mt-4 text-sm">{modalProject.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">{modalProject.tech.map(t => <span key={t} className="text-xs px-2 py-1 border rounded">{t}</span>)}</div>

              <div className="mt-6 flex gap-3">
                <a href={modalProject.github} target="_blank" rel="noreferrer" className="px-3 py-2 border rounded">View Code</a>
                <a href={modalProject.live} target="_blank" rel="noreferrer" className="px-3 py-2 bg-indigo-600 text-white rounded">Open Demo</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
