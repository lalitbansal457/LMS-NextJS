import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import moment from "moment";
import Box from '@mui/material/Box';

export default function LeaveComponent({leave}) {
	console.log(leave);

	return (
		<Grid container >
	        <Grid item xs={3} >
	        	<div>Leave period</div>
	        	<div>{moment(leave.fromDate).format("DD MMM YYYY")} - {moment(leave.fromDate).format("DD MMM YYYY")}</div>	
	        	<div>{leave.leaveType}</div>
	        </Grid>
	        <Grid item xs={2}>
	          <div>Status</div>
	          <div>{leave.status}</div>
	        </Grid>
	        <Grid item xs={1}>
	          <div>Days</div>
	          <div>{1}</div>
	        </Grid>
	        <Grid item xs={3}>
	          <div>Reason</div>
	          <div>{leave.leaveReason}</div>
	        </Grid>
	        <Grid item xs={3}>
	          <div>Applied On</div>
	          <div>{moment(leave.appliedOn).format("DD MMM YYYY")}</div>
	        </Grid>
	    </Grid>
	)
}


export async function getStaticProps({params}) {
	console.log("params", params);

	// get the current environment
	let dev = process.env.NODE_ENV !== 'production';
	let { DEV_URL, PROD_URL } = process.env;

	// request leaves from api
	let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/leaves/${params.lid}`);
	// extract the data
	let propsData = await response.json();

	return {
		props: {
			leave: propsData.message
		}	
	}
}

export async function getStaticPaths() {

	// get the current environment
	let dev = process.env.NODE_ENV !== 'production';
	let { DEV_URL, PROD_URL } = process.env;

	// request leaves from api
	let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/leaves`);
	// extract the data
	let pathData = await response.json();

	const pathIds = pathData.message.map((value) => {
		return {params: {lid: value._id}}
	})

	return {
		paths: pathIds,
		fallback: false
	}
}