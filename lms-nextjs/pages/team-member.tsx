import { signIn, useSession, signOut } from "next-auth/client"
import { useRouter } from 'next/router';
import ApplyLeaveComponent from "../components/apply-leave/applyLeave";

export default function teamMember() {

	const [session, loading] = useSession();
	const router = useRouter();
	console.log("sessionTeam", session)
	if(!session && !loading) {
		router.push('/login')
	}
	console.log("ApplyLeaveComponent" )

	
	return (
		<>
			<ApplyLeaveComponent />
			<div> Welcome Team Member</div>
			<div onClick= {()=>signOut() }>Sign Out</div>
		</>
	)

}