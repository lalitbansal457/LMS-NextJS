import { signIn, useSession, signOut } from "next-auth/client"
import { useRouter } from 'next/router';
import ApplyLeaveComponent from "../components/apply-leave/applyLeave";
import GetLeavesComponent from "../components/get-leaves/getLeaves";


export default function teamMember({leaves}) {

	const [session, loading] = useSession();
	const router = useRouter();

	if(!session && !loading) {
		router.push('/login')
	}
	const handleState = (x) => {
		console.log("x", x);
	}

	
	return (
		<>
		
			<ApplyLeaveComponent onLeaveApplied={handleState} />
		
			<GetLeavesComponent leaves={leaves} mt={3} />
			
		</>
	)

}


export async function getServerSideProps(ctx) {

	// get the current environment
	let dev = process.env.NODE_ENV !== 'production';
	let { DEV_URL, PROD_URL } = process.env;

	// request leaves from api
	let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/leaves`);
	// extract the data
	let reponseData = await response.json();

	return {
	    props: {
	        leaves: reponseData['message'],
	    },
	};
}