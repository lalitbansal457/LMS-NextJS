import { getProviders, signIn, useSession } from "next-auth/client"
import { postLoginData } from "../components/login";
import { useRouter } from 'next/router'

/*export async function getServerSideProps(context) {
  const providers = await getProviders();
  console.log("providers", providers)
  return {
    props: { providers },
  }
}*/

export default function loginForm() {
	const [session, loading] = useSession();
	const router = useRouter();

	if(session) {
		router.push('/team-member')
	}

	const loginUser = async event => {
		let userData = await postLoginData(event);
	}

	if(!session) {
		return (
			<div className="container mt-5">
				<div className="col-6 mx-auto">
					<form onSubmit={loginUser} >
				      	<input name="username" type="email" placeholder="Enter your username" className="form-control mb-3" autoComplete="name" required />
				      	<input name="password" type="password" placeholder="Enter your password" className="form-control mb-3" autoComplete="name" required />
				      	<button type="submit" className="btn btn-primary">Login</button>
				      	<button type="button" onClick={() => signIn()} className="btn btn-success ms-2">Login with google</button>
				    </form>
				</div>
			</div>
		)
	}

	return null

	
}