import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import moment from "moment";
import Box from '@mui/material/Box';


export default function GetLeavesComponent({leaves}) {

	const listItems = leaves.map((leave) =>
		<>
			<Box  pt={3} key={leave._id}>
		        <Grid container spacing={5}>
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
			</Box>
		<hr/>
		</>
    );

	return (
		<Container>
			<Grid item xs={12}>
				{listItems}	
			</Grid>
		</Container>
	)
}