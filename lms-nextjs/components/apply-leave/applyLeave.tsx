import { useForm, SubmitHandler, Controller, getValues } from "react-hook-form";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Checkbox from '@mui/material/Checkbox';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import FormControl from '@mui/material/FormControl';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import moment from "moment";
import FormControlLabel from '@mui/material/FormControlLabel';
import { useRouter } from 'next/router';


enum leaveTypeEnum {
  female = "female",
  male = "male",
  other = "other"
}

interface IFormInput {
  firstName: String;
  leaveType: leaveTypeEnum;
}

export default function ApplyLeaveComponent(props) {

	const { register, reset, handleSubmit, formState: { errors, isValid }, control, getValues } = useForm<IFormInput>({mode: "onChange"});

	const leaveData = getValues(); //  Get value from form
	const router = useRouter();

	// Form submit handler
	const onSubmit: SubmitHandler<IFormInput> =  async data => {
		data.status = "pending";
		data.appliedOn = moment();
		// Add leave
		let response = await fetch('/api/leaves', {
			method: 'POST',
            body: JSON.stringify(data)
		})
		let responseData = await response.json();
		refreshData();
		props.onLeaveApplied(responseData)
	};

	const refreshData = () => {
	   router.replace(router.asPath);
	 };

	// Type of leaves array
	const leaveTypes = [
		{"label" : "Casual Leave", "value": "casual"}, 
		{"label" : "Earned Leave", "value": "earned"}, 
		{"label" : "Sick Leave", "value": "sick"}, 
		{"label" : "Unpaid Leave", "value": "unpaid"}, 
		{"label" : "Work From Home", "value": "wfh"}
	];

	// HTML for leave list in dropdown
	const leaveList = leaveTypes.map((leaveType, index) => {
		return <MenuItem value={leaveType.value} key={index} >{leaveType.label}</MenuItem>
	});

	// Disable dates for "toDate"
	const disableDates = (startDate) => {
		return (date) => { // "date" is the list of dates from datepicker
			let momentDate = moment(date).format("YYYY-MM-DD");
			let startDate = moment(startDate).format("YYYY-MM-DD");
			if( moment(startDate).isAfter(momentDate)) {
				return Date.parse(date);
			}   
		}
	}

	 
	return (
		<Container>
			<h3>Apply Leave</h3>	
			<form onSubmit={handleSubmit(onSubmit)}>
			    <Box p={2} sx = {{bgcolor: '#ccc'}}>
				    <Grid container >
					    <Grid item xs={12}>
						    <Box pb={2}>
			    			    <FormControl fullWidth variant="filled">
			    				   	<Controller
			    				   		rules = {{ required: true }}
			    			           render={({ field}) => (
			    			           	<>
			    			           	<InputLabel id="select-label">Age</InputLabel>
			    			            <Select {...field} >
			    			            	{leaveList}
			                            </Select>
			                            </>
			    			           )}
			    			           name="leaveType"
			    			           control={control}
			    			           defaultValue=""
			    			           displayEmpty
			    			        />
			    		        </FormControl>
			    		    </Box>
					    </Grid>
					    
					    <Grid item xs={6}>
						    <Box pb={2}>
						        <FormControl fullWidth>
								    <Controller
								    		rules = {{ required: true }}
									        name="fromDate"
									        control={control}
									        defaultValue={null}
									        render={({ field }) => <LocalizationProvider dateAdapter={AdapterDateFns}>
								    	<DesktopDatePicker
								    		disablePast
								    	    label="From Date"
								    	    value={field.value}
								    	    onChange={(newValue) => {
								    	    	field.onChange(newValue);
								    	    	
								    	    }}
								    	    renderInput={(params) => <TextField variant="filled" {...params} />}
								    	  />
								    	</LocalizationProvider>}
									/>
								</FormControl>
							</Box>
						</Grid>
						<Grid item xs={6}>
							<Box pb={2}>
						        <FormControl  fullWidth>
								    <Controller
								    		rules = {{ required: true }}
									        name="toDate"
									        control={control}
									        defaultValue={null}
									        render={({ field }) => <LocalizationProvider dateAdapter={AdapterDateFns}>
								    	<DesktopDatePicker
								    		disabled ={!leaveData.fromDate}
								    		shouldDisableDate={disableDates(leaveData.fromDate)}
								    	    label="To Date"
								    	    value={field.value}
								    	    onChange={(newValue) => {
								    	    	field.onChange(newValue);
								    	    }}
								    	    renderInput={(params) => <TextField variant="filled" {...params} />}
								    	  />
								    	</LocalizationProvider>}
									/>
								</FormControl>
							</Box>
						</Grid>
						<Grid item xs={3}>
							<Box pb={2}>
								<Controller
							        name="isFirstHalf"
							        control={control}
							        defaultValue={false}
							        render={({ field }) => <FormControlLabel
								        label="First Half"
								        control={<Checkbox {...field} />}
								      />
								  }
							    />
							</Box>
						</Grid> 
						<Grid item xs={3}>
							<Box pb={2}>
								<Controller
							        name="isSecondHalf"
							        control={control}
							        defaultValue={false}
							        render={({ field }) => <FormControlLabel
								        label="Second Half"
								        control={<Checkbox {...field} />}
								      />
								  }
							    />
							</Box>
						</Grid> 
						<Grid item xs={12}>
							<Box pb={2}>
								<FormControl fullWidth>
									<Controller
								        name="leaveReason"
								        control={control}
								        defaultValue={""}
								        rules = {{ required: true }}
								        render={({ field }) => <TextField id="filled-basic" label="Reason for leave" variant="filled" onChange={(newValue) => {
								    	    	field.onChange(newValue);
								    	    }} />
									  }
								    />
								</FormControl>
								</Box>
						</Grid> 
					</Grid> 
					<Button type="submit" size="large" color="success" variant="contained" disabled={!isValid} >Apply Leave</Button>   
				</Box>
			    {/*
			    <div>
			    	<input type="checkbox" {...register("isFirstHalf")} id="isFirstHalf"  className="form-check-input" /> 
			    	<label className="form-check-label" htmlFor="isFirstHalf">
					    First half
					</label>
			    </div>
			    <div>
			    	<input type="checkbox" {...register("isSecondHalf")} id="isSecondHalf"  className="form-check-input" />
	    	    	<label className="form-check-label" htmlFor="isSecondHalf">
	    			    Second Half
	    			</label>
			    </div>
			    <div>
			    	<textarea name="comment" {...register("comment", {required: true})} id="" cols="30" rows="1" className="form-control"></textarea>
			    </div>*/}
		    </form>
		</Container>
	)
}
 