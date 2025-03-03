'use client'
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { X } from "lucide-react";
import React from "react";

const Message = ({ message }: any) => {

  const {toast} = useToast()
  const handleDelete = async () => {
    console.log("Deleting message with ID:", message._id);

    try {
      await axios.delete(`/api/deleteMessage?messageId=${message._id}`);

      toast({
        title: 'deleting message, please wait',
        variant: "destructive",
        duration : 5000
      })
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <div className="flex rounded-lg min-h-20 w-48 border-2 border-white p-2">
      <div className="w-[85%] min-h-full p-1 text-sm font-bold font-[gilroy]">
        <p>{message.content}</p>
      </div>
      <div className="w-[15%] h-full flex items-start justify-center rounded-lg">
        <X onClick={handleDelete} className="bg-red-500 rounded-lg p-1 cursor-pointer" />
      </div>
    </div>
  );
};

export default Message;
