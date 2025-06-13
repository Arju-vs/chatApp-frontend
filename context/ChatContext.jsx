import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const ChatContext = createContext()

export const ChatProvider = ({children})=>{

    const [msges,setMsges] = useState([]);
    const [users,setUsers] = useState([]);
    const [selectedUser,setSelectedUser] = useState(null)
    const [unseenMsges,setUnseenMsges] = useState({})

    const {socket, axios} = useContext(AuthContext)

    // function to get all users for sidebar
    const getUsers = async () =>{
        try {
            const { data }= await axios.get("/api/messages/users")
            if ( data.success ){
                setUsers(data.users)
                setUnseenMsges(data.unseenMsges)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // function to get messages for selected user
    const getMessages = async (userId)=>{
        try {
            const { data }= await axios.get(`/api/messages/${userId}`)
            if ( data.success ){
                setMsges(data.msges)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // function to send msges to selected user
    const sendMessage = async (messageData)=>{
        try {
            const { data } = await axios.post(`/api/messages/send/${selectedUser._id}`, messageData);
            if( data.success ){
                setMsges((prevMessages)=>[...prevMessages, data.newMsge])
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // function to subscribe to messages for selected user
    const subscribeToMessages = async ()=>{
        if(!socket) return;

        socket.on("newMessage", (newMessage)=>{
            if(selectedUser && newMessage.senderId === selectedUser._id){
                newMessage.seen = true;
                setMsges((prevMessages)=>[...prevMessages, newMessage])
                axios.put(`/api/messages/mark/${newMessage._id}`)
            }else{
                setUnseenMsges((prevUnseenMsges)=>({
                    ...prevUnseenMsges, [newMessage.senderId] : prevUnseenMsges[newMessage.senderId] ? prevUnseenMsges[newMessage.senderId] + 1 : 1
                }))
            }
        })
    }

    //  function to unsubcribe from mesgs
    const unsubcribeFromMessage = ()=>{
        if(socket) socket.off("newMessage");
    }

    useEffect(()=>{
        subscribeToMessages();
        return ()=> unsubcribeFromMessage()
    },[socket, selectedUser])

    const value = {
        msges,
        users,
        selectedUser,
        getUsers,
        setMsges,
        sendMessage,
        setSelectedUser,
        unseenMsges,
        setUnseenMsges,
        getMessages
    }
    
    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}