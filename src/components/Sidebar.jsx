import { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'

const Sidebar = () => {

  const { logout, onlineUsers } = useContext(AuthContext);
  const { getUsers, users,selectedUser,setSelectedUser,unseenMsges,setUnseenMsges } = useContext(ChatContext);

  const [showMenu, setShowMenu] = useState(false);
  const [input, setInput] = useState("")

  const navigate = useNavigate()

  const filteredUsers = input ? users.filter((user)=>user.fullName.toLowerCase().includes(input.toLowerCase())) : users;

  useEffect(()=>{
    getUsers()
  },[onlineUsers])

  return (
    <div className={`bg-[#8185b2]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white ${selectedUser ? "max-md:hidden" : ''}`}>
      <div className='pb-5'>
        <div className="flex justify-between items-center">
          <img src={assets.logo} alt="logo" className='max-w-10' />
          <div className="relative">
            <img
              src={assets.menu_icon}
              alt="menu"
              className='max-h-5 cursor-pointer'
              onClick={() => setShowMenu(prev => !prev)}
            />

            {showMenu && (
              <div className='absolute top-full right-0 z-20 w-32 p-5 bg-[#67b6e6] rounded-md border border-black-600 text-gray-100'>
                <p
                  onClick={() => {
                    navigate('/profile');
                    setShowMenu(false);
                  }}
                  className='cursor-pointer text-sm'
                >
                  Edit Profile
                </p>
                <hr className='my-2 border-t border-gray-950' />
                <p
                  onClick={() => {
                    logout();
                    setShowMenu(false);
                  }}
                  className='cursor-pointer text-sm'
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        </div>

        <div className='bg-[#1a1822] rounded-full flex items-center gap-2 my-2 py-3 px-4'>
          <img src={assets.search_icon} alt="search" className='w-3' />
          <input onChange={(e)=>setInput(e.target.value)} type="text" className='bg-transparent border-none outline-none text-white text-xs placeholder:[#c8c8c8] flex-1 ' placeholder='Search User..' />
        </div>
      </div>

      <div className='flex flex-col'>
        {
        filteredUsers.map((user,index)=>(
          <div onClick={()=>{setSelectedUser(user);
            setUnseenMsges(prev=>({...prev, [user._id]:0}))
          }}
          key={index} className={`relative flex items-center gap-2 p-2 pl-2 rounded cursor-pointer max-sm:text-sm ${selectedUser?._id === user._id && 'bg-[#282142]/50'}`}>
            <img src={user?.profilePic || assets.avatar_icon} alt="profilePic" className='w-[35px] aspect-[1/1] rounded-full' />
            <div className='flex flex-col leading-5'>
                <p>{user.fullName}</p>
                {
                  onlineUsers.includes(user._id) ?
                  <span className='text-green-600 text-xs'>Online</span>
                  :
                  <span className='text-red-600 text-xs'>Offline</span>
                }
            </div>
            {
              unseenMsges[user._id] > 0 && <p className='absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50'>{unseenMsges[user._id]}</p>
            }
          </div>
        ))
        }
      </div>

    </div>
  )
}

export default Sidebar