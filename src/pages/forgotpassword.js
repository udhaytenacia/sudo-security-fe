import React, { Component } from "react";
import $ from 'jquery';
import swal from 'sweetalert2';
import axios from 'axios';

class ForgotPassword extends Component{
    constructor(props) {
        super(props);
		this.btnSubmitLogin = this.fnSubmitLogin.bind(this);
		this.txt_emailChange = this.fntxtEmailChange.bind(this);
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
    
	fnSubmitLogin(){
		var email = $("#text_email").val();
		
		if(email.length === 0)
		{
			swal.fire({
                icon: 'error',
                title: 'Submit Failed.',
                html: 'Please enter email Id.'
            });
          return;
		}
		this.getUsersData(email);
	}
    async getUsersData(userName) {
        axios
            .get("https://localhost:44320/api/UserMaster/GetUserDetailsByEmail?userName="+userName+"")
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
							html: 'Valid Credentials.You will receive password token to your mail id.'
						}).then(function(){
                            window.location.href = "/";
                        });
					}
					else{
						swal.fire({
							icon: 'error',
							title: 'Invalid.',
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
        return(
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
					<button className="button button-block" onClick={this.btnSubmitLogin}>Submit</button> 
                    <br/>
			</div>
		</div>	
	</div>	
	<div className="w3copyright-agile">
		<p>© 2021 Sudo Security login Form. All rights reserved | Design by 
            <a href="http://tenaciatech.com/">Tenacia Pvt Ltd</a></p>
	</div>
            </div>
        )
    }
}

export default ForgotPassword;