import { useForm, SubmitHandler } from "react-hook-form";


enum leaveTypeEnum {
  female = "female",
  male = "male",
  other = "other"
}

interface IFormInput {
  firstName: String;
  leaveType: leaveTypeEnum;
}

export default function ApplyLeaveComponent() {

	const { register, handleSubmit } = useForm<IFormInput>();
	const onSubmit: SubmitHandler<IFormInput> = data => console.log(data);
	const leaveTypes = [
		{"displayText" : "Casual Leave", "value": "casual"}, 
		{"displayText" : "Earned Leave", "value": "earned"}, 
		{"displayText" : "Sick Leave", "value": "sick"}, 
		{"displayText" : "Unpaid Leave", "value": "unpaid"}, 
		{"displayText" : "Work From Home", "value": "wfh"}
	];

	const leaveList = leaveTypes.map((leaveType, index) => {
		return <option value={leaveType.value} key={index}>{leaveType.displayText}</option>
	});

	 
	return (
		<div className="container mt-5">
			<div className="col-6 mx-auto">
				<form onSubmit={handleSubmit(onSubmit)}>
			      	<select {...register("leaveType")} className="form-control">
				        {leaveList}
				    </select>
			      <input type="submit" />
			    </form>
			</div>
		</div>
	)
}