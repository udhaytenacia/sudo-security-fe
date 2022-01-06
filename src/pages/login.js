import React, { Component } from "react";
import $ from 'jquery';
import swal from 'sweetalert2';
import axios from 'axios';

class Login extends Component {
	constructor(props) {
        super(props);
		this.btnSubmitLogin = this.fnSubmitLogin.bind(this);
		this.txt_emailChange = this.fntxtEmailChange.bind(this);
		this.text_passwordChange = this.fnPasswordValidate.bind(this);
		this.divValidate = this.formValidate.bind(this);
		this.state = { data_dealer: []};
	}
	componentDidMount() {
		//add on load content here
	}
	fnSubmitLogin(){
		var email = $("#text_email").val();
		var password = $("#text_password").val();
		if(email.length === 0 || password.length === 0)
		{
			swal.fire({
                icon: 'error',
                title: 'Submit Failed.',
                html: 'Please enter all fields.'
            });
          return;
		}
		this.getUsersData(email,password);
	}
	formValidate(){
		var val = $("#text_email").val();
		if(val.length === 0)
      	{
			$("#span_email").addClass("hide");
			$("#span_email").html("");	
		}	
		var passval = $("#text_password").val();
		if(passval.length === 0)
      	{
			$("#span_password").addClass("hide");
			$("#span_password").html("");	
		}	
		
	}
	fntxtEmailChange()
	{
	  var val = $("#text_email").val();
      if(val.length > 0)
      {
        $("#text_email").parent("div").children("label").addClass("active highlight");
		if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test($("#text_email").val())) { 
			$("#span_email").addClass("hide");
			$("#span_email").html("");	
		}
		else{
			$("#span_email").removeClass("hide");
			$("#span_email").html("Please enter valid email id");
		}
      }
      else{
        $("#text_email").parent("div").children("label").removeClass("active highlight");
		    $("#span_email").removeClass("hide");
			$("#span_email").html("Please enter valid email id");
      }
		
	}
	fnPasswordValidate(){
		var val = $("#text_password").val();
      if(val.length > 0)
      {
        $("#text_password").parent("div").children("label").addClass("active highlight");
		if (/^(?=.*\d)(?=(.*\W){1})(?=.*[a-zA-Z])(?!.*\s).{8,16}$/.test($("#text_password").val())) { 
			$("#span_password").addClass("hide");
			$("#span_password").html("");	
		}
		else{
			$("#span_password").removeClass("hide");
			$("#span_password").html("Please enter valid password. It should contain minimum 8 characters and 1 capital and 1 numeric.");
		}
      }
      else{
        $("#text_password").parent("div").children("label").removeClass("active highlight");
		    $("#span_password").removeClass("hide");
			$("#span_password").html("Please enter valid password. It should contain minimum 8 characters and 1 capital and 1 numeric.");
      }
	}
	async getUsersData(userName, password) {
        axios
            .get("https://localhost:44320/api/UserMaster/GetUserDetails?userName="+userName+"&password="+password+"")
            .then(response => {
                var res = response.data;
                console.log(res);
				var email = res.emailId;
				if(userName !== 'test')
				{
					if(email !== '')
					{
						swal.fire({
							icon: 'success',
							title: 'Success',
							html: 'Valid Credentials.'
						});
					}
					else{
						swal.fire({
							icon: 'error',
							title: 'Login Failed.',
							html: ''+res.result+''
						});
					}
				}
				
                this.setState({ data_dealer: res });

            })
            .catch(function (error) {
                console.log(error);
            });
    };
	render(){
    return (
        <div className="container">
            <div className="main-agileits">
		
		<div className="mainw3-agileinfo form">
		<h1>SUDO SECURITY</h1>
			<div id="login" onMouseMove={this.divValidate}>    
					<div className="field-wrap">
						<label className=""> Enter Your Email<span className="req">*</span> </label>
						<input id="text_email" type="email" required="" 
							onChange={this.txt_emailChange}
						/>
					</div>
					<span id="span_email" className="validation hide"></span> 
					<br/>
					<div className="field-wrap">
						<label className=""> Your Password<span className="req">*</span> </label>
						<input id="text_password" type="password" required="" onChange={this.text_passwordChange} />
					</div> 
					<br/>
					<span id="span_password" className="validation hide"></span> 
					<p className="forgot"><a href="/forgotpassword">Forgot Password?</a></p>
					<button className="button button-block" onClick={this.btnSubmitLogin}>Log In</button> 
					<p className="forgot"><a href="/signup">If new to here please Sign Up</a></p> 
			</div>
         
		</div>	
	</div>	
	<div className="w3copyright-agile">
		<p>© 2021 Sudo Security login Form. All rights reserved | Design by 
            <a href="http://tenaciatech.com/">Tenacia Pvt Ltd</a></p>
	</div>
        </div>
  )
    };
};

export default Login;