import React from 'react'
import { Helmet } from 'react-helmet'

export default function Contact() {
    
    return <>
    <Helmet>
        <title>AllPiq - Contact</title>
    </Helmet>
    <div className="relative container max-w-lg mx-auto p-10 bg-white rounded-2xl shadow-lg  w-full">
        <div className='mt-30'>
            <div className="absolute inset-0 -z-10 transform rotate-6 bg-purple-400 rounded-2xl" />
    <h2 className="text-xl font-semibold text-blue-900">
        <span className="text-purple-400 font-bold">Get Help?</span> Please Write Your Subject, Message &amp; Notify Your Email.
    </h2>
    <div className="mt-5 space-y-4">
        <div>
        <label className="block font-medium text-gray-700">Full Name*</label>
        <input type="text" placeholder="Type Name" className="w-full mt-1 p-3 border rounded-md focus:ring-2 focus:ring-blue-900 outline-none" />
        </div>
        <div>
        <label className="block font-medium text-gray-700">Email*</label>
        <input type="email" placeholder="Type Your Email" className="w-full mt-1 p-3 border rounded-md focus:ring-2 focus:ring-blue-900 outline-none" />
        </div>
        <div>
        <label className="block font-medium text-gray-700">Subject*</label>
        <input type="text" placeholder="Type Here" className="w-full mt-1 p-3 border rounded-md focus:ring-2 focus:ring-blue-900 outline-none" />
        </div>
        <div>
        <label className="block font-medium text-gray-700">Your Message*</label>
        <textarea placeholder="Type Here" rows={4} className="w-full mt-1 p-3 border rounded-md focus:ring-2 focus:ring-blue-900 outline-none" defaultValue={""} />
        </div>
        <button type="submit" className="w-full py-3 text-white bg-gradient-to-tr from-blue-950 to-purple-400 transition">
        Send Message
        </button>
        </div>
        </div>
    </div>

    </>
}
