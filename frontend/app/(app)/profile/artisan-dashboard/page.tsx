import React from 'react'
import Sidebar from '@/app/components/Sidebar'

const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
          {/* Sidebar */}
          <div className="fixed left-0 top-0 h-screen w-64 z-30">
            <Sidebar />
          </div>
    </div>
  )
}

export default page 