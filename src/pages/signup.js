import React, { Component } from "react";
import $ from 'jquery';
import swal from 'sweetalert2';

const axios = require('axios').default;

const newPost = {
    id: '00000000-0000-0000-0000-000000000000',
    emailId: '',
    password: '',
    userName:'',
    mobileNo:'',
    others:'',
    createdOn:'2021-12-21T12:44:56.477Z',
    createdBy:'00000000-0000-0000-0000-000000000000',
    updatedOn:'2021-12-21T12:44:56.477Z',
    updatedBy:'00000000-0000-0000-0000-000000000000',
    isActive:true,
    result:''
};

const sendPostRequest = async () => {
    try {
        const resp = await axios({
            method:'POST',
            url:'https://localhost:44320/api/UserMaster/SaveUserDetails',
            headers:{
                "accept":"text/plain",
                "Content-Type":"application/json"
            },
            data: newPost
        });
        console.log(resp.data);
        var res = resp.data;
        if(res.result === "Registered Successfully")
        {
            swal.fire({
                icon: 'success',
                title: 'Success.',
                html: ''+ res.result +''
            }).then(function(){
                window.location.href = "/";
            });
        }
        else{
            swal.fire({
                icon: 'error',
                title: 'Registration Failed.',
                html: ''+ res.result +''
            });
        }
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};
class Signup extends Component {
	constructor(props) {
        super(props);
		this.btnRegister = this.fnSubmitRegister.bind(this);
		this.reg_txtEmail = this.fntxtEmailChange.bind(this);
		this.reg_textPassword = this.fnPasswordValidate.bind(this);
		this.reg_textConfirmPassword = this.fnConfirmPasswordValidate.bind(this);
        this.reg_textUsername = this.fnTextUserName.bind(this);
        this.divValidate = this.formValidate.bind(this);
	}
    componentDidMount(){
        //sendPostRequest();
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
		if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test($("#reg_textEmail").val())) { 
			$("#reg_spanEmail").addClass("hide");
			$("#reg_spanEmail").html("");	
		}
		else{
			$("#reg_spanEmail").removeClass("hide");
			$("#reg_spanEmail").html("Please enter valid email id");
		}
	}
	fnPasswordValidate(){
		if (/^(?=.*\d)(?=(.*\W){1})(?=.*[a-zA-Z])(?!.*\s).{8,16}$/.test($("#reg_textPassword").val())) { 
			$("#reg_spanPassword").addClass("hide");
			$("#reg_spanPassword").html("");	
		}
		else{
			$("#reg_spanPassword").removeClass("hide");
			$("#reg_spanPassword").html("Please enter valid password. It should contain minimum 8 characters and 1 capital and 1 numeric.");
		}
	}
    fnConfirmPasswordValidate(){
		if (/^(?=.*\d)(?=(.*\W){1})(?=.*[a-zA-Z])(?!.*\s).{8,16}$/.test($("#reg_textConfirmPassword").val())) { 
			if($("#reg_textConfirmPassword").val() === $("#reg_textPassword").val())
            {
                $("#reg_spanConfirmPassword").addClass("hide");
			    $("#reg_spanConfirmPassword").html("");	
            }
            else{
                $("#reg_spanConfirmPassword").removeClass("hide");
			    $("#reg_spanConfirmPassword").html("Confirm password should match with Password.");	
            }
            
		}
		else{
			$("#reg_spanConfirmPassword").removeClass("hide");
			$("#reg_spanConfirmPassword").html("Please enter valid password. It should contain minimum 8 characters and 1 capital and 1 numeric.");
		}
	}
    fnTextUserName()
    {
        var val = $("#reg_textUsername").val();
        if(val.length > 0 )
        {
            $("#reg_spanUsername").addClass("hide");
            $("#reg_spanUsername").html("");	
        }
        else{
            $("#reg_spanUsername").removeClass("hide");
            $("#reg_spanUsername").html("Please enter Username.");	
        }
    }
    fnSubmitRegister(){
		var email = $("#reg_textEmail").val();
		var password = $("#reg_textPassword").val();
        var username = $("#reg_textUserName").val();
        var mobileno = $("#reg_textMobileNo").val();
        var others = $("#reg_textOthers").val();
        if((email.length === 0) || (password.length < 8) || (username.length === 0))
        {
            swal.fire({
                icon: 'error',
                title: 'Submit Failed.',
                html: 'Please enter all fields.'
            });
          return;
        }
        newPost.id = '00000000-0000-0000-0000-000000000000';
        newPost.emailId = email;
        newPost.password = password;
        newPost.userName = username;
        newPost.mobileNo = mobileno;
        newPost.others = others;
        newPost.createdOn = '2021-12-21T12:44:56.477Z';
        newPost.createdBy = '00000000-0000-0000-0000-000000000000';
        newPost.updatedOn = '2021-12-21T12:44:56.477Z';
        newPost.updatedBy = '00000000-0000-0000-0000-000000000000';
        newPost.isActive = true;
        newPost.result = '';
        sendPostRequest();
	}
	render(){
    return (
        <div className="container">
            <div className="main">
		<div className="agile">
			<div className="signin-form profile">
				<h3>Register</h3>
				
				<div className="login-form">
						<input id="reg_textEmail" type="text" name="email" placeholder="E-mail*" required="" onChange={this.reg_txtEmail}/>
                        <span id="reg_spanEmail" className="validation hide"></span> 
						<input id="reg_textUserName" type="text" name="name" placeholder="Username*" required="" onChange={this.reg_textUsername}/>
                        <span id="reg_spanUsername" className="validation hide"></span> 
						<input id="reg_textPassword" type="password" name="password" placeholder="Password*" required="" onChange={this.reg_textPassword}/>
                        <span id="reg_spanPassword" className="validation hide"></span> 
						<input id="reg_textConfirmPassword" type="password" name="password" placeholder="Confirm Password*" required="" 
                                onChange={this.reg_textConfirmPassword}/>
                        <span id="reg_spanConfirmPassword" className="validation hide"></span> 
                        <span id="reg_span_username" className="validation hide"></span> 
                        <input id="reg_textMobileNo" type="text" name="mobilenumber" placeholder="Mobile Number" />
                        <input id="reg_textOthers" type="text" name="others" placeholder="Others" />
						<input type="submit" value="REGISTER" onClick={this.btnRegister}/>
				</div>
				<p><a href="."> By clicking register, I agree to your terms</a></p>
                <p className="back-to"><a href="/">Back to Login.</a></p> 
			</div>
		</div>
		
	</div>
        </div>
  )
    };
};

export default Signup;