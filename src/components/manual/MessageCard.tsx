import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from "../ui/button"
import { Message } from "@/models/user"

const handleDeleteConfirm = async () =>{
    


}

type messagecardprops = 
{
    message: Message,
    onMessageDelete : (mesaageid:string)=>void
}
  
  
  const MessageCard = ({message,onMessageDelete}:messagecardprops) => {
    return (
        <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="bg-red-500 text-white font-bold px-1 py-1">x</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteConfirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
      </Card>
      
    )
  }
  
  export default MessageCard