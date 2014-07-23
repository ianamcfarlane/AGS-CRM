	function Form_onload(){
	/* Ascentium Custom Code – START */ 
	var CRM_FORM_TYPE_CREATE = 1 ;
	var CRM_FORM_TYPE_UPDATE = 2;
	var ACTIVITY_STATUS_NEW = 1;
	var ACTIVITY_STATUS_PENDING_INVESTIGATION = 2;
	var STATUS_APPROVED = 3;

	var CRM_FORM_TYPE_CREATE = 1;
	var CRM_FORM_TYPE_UPDATE = 2;

	var CRM_REQUIRED_LEVEL_REQUIRED = 2;

	var CASETTYPECODE_COMPLAINT_PICKLIST_VALUE = '1';
	var CASETTYPECODE_PRODUCTASSURANCE_PICKLIST_VALUE = '2';
	var CASETTYPECODE_DEFECTIVE_PICKLIST_VALUE = '3';

	var PROBLEMNATURE_DEFECTIVE_PACKAGE_PICKLIST_VALUE = '1';
	var PROBLEMNATURE_DEFECTIVE_PRODUCT_PICKLIST_VALUE = '2';

	var PROBLEMTYPE_SOILED_PACKAGE_PICKLIST_VALUE = '1';
	var PROBLEMTYPE_TORN_PACKAGE_PICKLIST_VALUE = '2';
	var PROBLEMTYPE_OLD_PACKAGE_PICKLIST_VALUE = '3';
	var PROBLEMTYPE_LABEL_MISSING_PICKLIST_VALUE = '4';
	var PROBLEMTYPE_CONTAINER_LEAKING_PICKLIST_VALUE = '5';
	var PROBLEMTYPE_CONTAINER_SOILED_PICKLIST_VALUE = '6';
	var PROBLEMTYPE_PARTIAL_CONTAINER_PICKLIST_VALUE = '7';
	var PROBLEMTYPE_LAKING_CAP_PICKLIST_VALUE = '8';
	var PROBLEMTYPE_MISSING_CONTAINER_PICKLIST_VALUE = '9';
	var PROBLEMTYPE_PRODUCT_LUMPY_PICKLIST_VALUE = '10';
	var PROBLEMTYPE_PRODUCT_THICK_PICKLIST_VALUE = '11';
	var PROBLEMTYPE_NON_MIXING_PICKLIST_VALUE = '12';
	var PROBLEMTYPE_OTHER_PICKLIST_VALUE = '13';

	function ChangeCustomerLookupDefault(){
		document.getElementById("customerid").setAttribute("defaulttype", "2"); 
	}	
	function CheckFieldsVisible(){
		if(Xrm.Page.getAttribute("fmc_approvedenycomplaintstatus").getValue() == STATUS_APPROVED){
			HideShowCheckFields(true);
		}
		else{
			 HideShowCheckFields(false);
		}
	}

	function ShowHideTabs(){
		switch(Xrm.Page.getAttribute("casetypecode").getText()){
			case "Product Assurance":
				Xrm.Page.ui.tabs.get("ComplaintDetails").setVisible(true);
				Xrm.Page.ui.tabs.get("DefectiveProduct").setVisible(false);
				Xrm.Page.ui.tabs.get("Payee").setVisible(true);
				Xrm.Page.ui.tabs.get("ComplaintApproval").setVisible(true);
				Xrm.Page.ui.tabs.get("DefectiveProductAdvisory").setVisible(false);
				break;
			case "Complaint":
				Xrm.Page.ui.tabs.get("ComplaintDetails").setVisible(true);
				Xrm.Page.ui.tabs.get("DefectiveProduct").setVisible(false);
				Xrm.Page.ui.tabs.get("Payee").setVisible(true);
				Xrm.Page.ui.tabs.get("ComplaintApproval").setVisible(true);
				Xrm.Page.ui.tabs.get("DefectiveProductAdvisory").setVisible(false);
				break;
			case "Defective Product Advisory":	
				Xrm.Page.ui.tabs.get("ComplaintDetails").setVisible(false);
				Xrm.Page.ui.tabs.get("DefectiveProduct").setVisible(true);
				Xrm.Page.ui.tabs.get("Payee").setVisible(false);
				Xrm.Page.ui.tabs.get("ComplaintApproval").setVisible(false);
				Xrm.Page.ui.tabs.get("DefectiveProductAdvisory").setVisible(true);
				break;
			default:
		}
	}

	function PayeeTabProperties(){
		//var customer = new Array;
		//customer = null;
		
		var customer =  Xrm.Page.getAttribute("customerid").getValue();

		if (customer[0] != null && 
			(Xrm.Page.getAttribute("casetypecode").getValue() == CASETTYPECODE_COMPLAINT_PICKLIST_VALUE || 
			Xrm.Page.getAttribute("casetypecode").getValue() == CASETTYPECODE_PRODUCTASSURANCE_PICKLIST_VALUE)){
			if(customer[0].typename == 'contact'){
			alert("hi");
				Xrm.Page.getControl("fmc_socialsecuritynumber1").setDisabled(false);
				Xrm.Page.getAttribute("fmc_socialsecuritynumber1").setRequiredLevel("required");
				
				//set account payee to "" and disable
				Xrm.Page.getAttribute("fmc_1stpayeeaccountid").setValue("");
				Xrm.Page.getControl("fmc_1stpayeeaccountid").setDisabled(true);
				
				Xrm.Page.getAttribute("responsiblecontactid").setValue(customer);
			}	
			else {
				Xrm.Page.getControl("fmc_socialsecuritynumber1").setDisabled(false);
				
				
				//set contat payee to "" and disable
				Xrm.Page.getAttribute("responsiblecontactid").setValue("");
				 Xrm.Page.getControl("responsiblecontactid").setDisabled(false);
				
				Xrm.Page.getAttribute("fmc_1stpayeeaccountid").setValue(customer);
			}
		}
		
	}

	function HideShowCheckFields(bVisible){
		if(bVisible){
			Xrm.Page.ui.controls.get("fmc_checkissued").setVisible(true);
			Xrm.Page.ui.controls.get("fmc_checkissueddate").setVisible(true);
			Xrm.Page.ui.controls.get("fmc_checknumber").setVisible(true);
			Xrm.Page.ui.controls.get("fmc_checkamount").setVisible(true);
		}
		else{
			Xrm.Page.ui.controls.get("fmc_checkissued").setVisible(false);
			Xrm.Page.ui.controls.get("fmc_checkissueddate").setVisible(false);
			Xrm.Page.ui.controls.get("fmc_checknumber").setVisible(false);
			Xrm.Page.ui.controls.get("fmc_checkamount").setVisible(false);
		}	
	}

	function SetComplaintAttributesRequiredLevel(required){
		Xrm.Page.getAttribute("fmc_reporttype").setRequiredLevel(required);
		Xrm.Page.getAttribute("fmc_cropid").setRequiredLevel(required);
		Xrm.Page.getAttribute("fmc_complainttype").setRequiredLevel(required);
		Xrm.Page.getAttribute("fmc_dateofapplication").setRequiredLevel(required);
	}
	function SetDefectiveProductionrequiredLevel(required){
		Xrm.Page.getAttribute("fmc_natureofproblems").setRequiredLevel(required);
		Xrm.Page.getAttribute("fmc_typeofproblem").setRequiredLevel(required);
		Xrm.Page.getAttribute("fmc_retailid").setRequiredLevel(required);
	}

	function setComplaintApprover() {
	var number = 1;
	var filter = "/fmc_complaintapproverSet?$select=fmc_name,fmc_complaintapproverId&$filter=fmc_name eq 'Default'";
	RetrieveCA(filter);
	}
	function GetODataPath() {
	return Xrm.Page.context.prependOrgName("/xrmservices/2011/organizationdata.svc");
	}
	function RetrieveCA(filter) {

	var retrieveRecordsReq = new XMLHttpRequest();
	retrieveRecordsReq.open("GET", GetODataPath() + filter, false);
	retrieveRecordsReq.setRequestHeader("Accept", "application/json");
	retrieveRecordsReq.setRequestHeader("Content-Type", "application/json; charset=utf-8?");
	var temp= retrieveRecordsReq.send();
	if (retrieveRecordsReq.readyState == 4 && retrieveRecordsReq.status == 200) {
		var retrievedRecords = this.parent.JSON.parse(retrieveRecordsReq.responseText).d;
		var Result = retrievedRecords.results[0];
		var lookup = new Object();
		var lookupValue = new Array();
		lookup.id = Result.fmc_complaintapproverId;
		lookup.entityType = "fmc_complaintapprover";
		lookup.name = Result.fmc_name;
		lookupValue[0] = lookup;
		Xrm.Page.getAttribute("fmc_complaintapproverlookup").setValue(lookupValue);
		}
	}

	function CheckApprover(){
		var user = Xrm.Page.context.getUserId();
		if (Xrm.Page.getAttribute("fmc_approver").getValue() != null){
			var approver = Xrm.Page.getAttribute("fmc_approver").getValue()[0].id;
			if (user == approver){
				Xrm.Page.getControl("fmc_approvedenycomplaintstatus").setDisabled(false);
				
			}
			if (UserHasRole("System Administrator")){
				Xrm.Page.getControl("fmc_approvedenycomplaintstatus").setDisabled(false);
			}
			else {
				Xrm.Page.getControl("fmc_approvedenycomplaintstatus").setDisabled(true);
				
			}
		}
	}

	function Ascentium_OnLoad(){
		CheckApprover();
		ChangeCustomerLookupDefault();
		Xrm.Page.getAttribute("customerid").defaulttype = "2";
		
		if (Xrm.Page.ui.getFormType() == 1){
		 
		   setComplaintApprover();
		   Xrm.Page.ui.tabs.get("ComplaintDetails").setVisible(false);
		   Xrm.Page.ui.tabs.get("DefectiveProduct").setVisible(false);
		   Xrm.Page.ui.tabs.get("Payee").setVisible(false);
		   Xrm.Page.ui.tabs.get("DefectiveProductAdvisory").setVisible(false);
		   CheckFieldsVisible();
		}
		else{
		  window.originalPickListOptions = Xrm.Page.getAttribute("fmc_unitofmeasure").getOptions();
		  ShowHideTabs();
		 
		  CheckFieldsVisible();
		}
		
	}

	Ascentium_OnLoad();
	}
	// function Form_onsave(){
	// if (Xrm.Page.getAttribute("casetypecode").getValue() == null){
	// window.originalPickListOptions = Xrm.Page.getAttribute("fmc_unitofmeasure").getOptions();
	// tab1Tab.style.display = 'none';
	// tab2Tab.style.display = 'none';
	// tab3Tab.style.display = 'none';
	// tab5Tab.style.display = 'none';
	// }
	// var ACTIVITY_STATUS_NEW = '1';
	// var CASETTYPECODE_COMPLAINT_PICKLIST_VALUE = '1';
	// var CASETTYPECODE_PRODUCTASSURANCE_PICKLIST_VALUE = '2';
	// var CASETTYPECODE_DEFECTIVE_PICKLIST_VALUE = '3';

	// if (Xrm.Page.getAttribute("casetypecode").getValue() == CASETTYPECODE_COMPLAINT_PICKLIST_VALUE || Xrm.Page.getAttribute("casetypecode").getValue() == CASETTYPECODE_PRODUCTASSURANCE_PICKLIST_VALUE || Xrm.Page.getAttribute("casetypecode").getValue() == CASETTYPECODE_DEFECTIVE_PICKLIST_VALUE ){
		 // if (Xrm.Page.getAttribute("fmc_activitystatus").getValue() == null){
			// Xrm.Page.getAttribute("fmc_activitystatus").setValue(ACTIVITY_STATUS_NEW);
		 // }
	// }
	// }


	function SetTypeOfProblem(){
		
		var picklistOneName = "fmc_natureofproblems"; //name of the first picklist
		var picklistTwoName = "fmc_typeofproblem";  //name of the picklist with dynamic values

		var picklistOne = Xrm.Page.getControl(picklistOneName);
		var picklistOneAttribute = picklistOne.getAttribute();

		var picklistTwo = Xrm.Page.getControl(picklistTwoName);
		var picklistTwoAttribute = picklistTwo.getAttribute();
		
		var picklistOneSelectedOption = picklistOneAttribute.getSelectedOption();

		var picklistOneSelectedText = "";	
			if (picklistOneSelectedOption != null){
			picklistOneSelectedText = picklistOneSelectedOption.text;
		}

		//This "if" statement stores the original values from the dynamic picklist.
		//Very important if the user hasn't made a selection on the first picklist or if the selection changes
		if (picklistTwo.flag == true){
		picklistTwo.clearOptions();
		var origOptions = picklistTwo.originalPicklistValues;
		
			for (var i = origOptions.length - 1; i >= 0; i--){ 
				if(origOptions[i].text != ""){
					picklistTwo.addOption(origOptions[i]);
				}
			}		
		}
		else {		
		picklistTwo.originalPicklistValues = picklistTwoAttribute.getOptions();
		picklistTwo.flag = true; 
		}

		if (picklistOneSelectedText != null && picklistOneSelectedText != ""){		
			var picklistTwoOptions = picklistTwoAttribute.getOptions();
			Xrm.Page.getControl("fmc_typeofproblem").setDisabled(false);
			for (var i = picklistTwoOptions.length - 1; i >= 0; i--) {  
				
				if (picklistTwoOptions[i].value != null && picklistTwoOptions[i].value != "") {
					var optionText = picklistTwoOptions[i].text;
					var optionValue = picklistTwoOptions[i].value;
					
					//BEGIN: If the picklist is set to PROBLEMNATURE_DEFECTIVE_PACKAGE_PICKLIST_VALUE
					if(picklistOneSelectedText == "Defective Package")
					{							
						//Remove these values
						if (optionValue == PROBLEMTYPE_PRODUCT_LUMPY_PICKLIST_VALUE 
							|| optionValue == PROBLEMTYPE_PRODUCT_THICK_PICKLIST_VALUE 
							|| optionValue == PROBLEMTYPE_NON_MIXING_PICKLIST_VALUE 
							|| optionValue == PROBLEMTYPE_OTHER_PICKLIST_VALUE
							)
						{
							picklistTwo.removeOption(optionValue);
						}

					}
					//END: PROBLEMNATURE_DEFECTIVE_PACKAGE_PICKLIST_VALUE Selection
					
					//BEGIN: If the picklist is set to PROBLEMNATURE_DEFECTIVE_PRODUCT_PICKLIST_VALUE
					if(picklistOneSelectedText == "Defective Product")
					{
						//Remove these values
						if (optionValue == PROBLEMTYPE_SOILED_PACKAGE_PICKLIST_VALUE
							|| optionValue == PROBLEMTYPE_TORN_PACKAGE_PICKLIST_VALUE
							|| optionValue == PROBLEMTYPE_OLD_PACKAGE_PICKLIST_VALUE
							|| optionValue == PROBLEMTYPE_LABEL_MISSING_PICKLIST_VALUE
							|| optionValue == PROBLEMTYPE_CONTAINER_LEAKING_PICKLIST_VALUE
							|| optionValue == PROBLEMTYPE_CONTAINER_SOILED_PICKLIST_VALUE
							|| optionValue == PROBLEMTYPE_PARTIAL_CONTAINER_PICKLIST_VALUE
							|| optionValue == PROBLEMTYPE_LAKING_CAP_PICKLIST_VALUE
							|| optionValue == PROBLEMTYPE_MISSING_CONTAINER_PICKLIST_VALUE
							|| optionValue == PROBLEMTYPE_OTHER_PICKLIST_VALUE
						)
						{
							picklistTwo.removeOption(optionValue);
						}

					}			
					//END: PROBLEMNATURE_DEFECTIVE_PRODUCT_PICKLIST_VALUE Selection
					
				}
			}
		}
		
	}

	function MultiplePayee_OnChange(){	
		if(Xrm.Page.getAttribute("customerid").getValue() != null){
			if (Xrm.Page.getAttribute("fmc_multiplepayee").getValue() == true){
				var customer = new Array;
				customer = null;
			
				customer =  Xrm.Page.getAttribute("customerid").getValue();

				if (customer[0] != null){
					if(customer[0].typename == 'contact'){
						Xrm.Page.getControl("fmc_socialsecuritynumber2").setDisabled(false);
						Xrm.Page.getAttribute("fmc_socialsecuritynumber2").setRequiredLevel("required");
					}
					
					if (customer[0].typename == 'account'){
						Xrm.Page.getControl("fmc_businessfederaltaxidnumber").setDisabled(false);
						Xrm.Page.getAttribute("fmc_businessfederaltaxidnumber").setRequiredLevel("required");
					}
				}
				
				Xrm.Page.getControl("fmc_2ndpayexplanation").setDisabled(false);
				
				Xrm.Page.getControl("fmc_percentageofpayment").setDisabled(false);
				Xrm.Page.getAttribute("fmc_percentageofpayment").setRequiredLevel("required");

				Xrm.Page.getControl("fmc_2payeenameid").setDisabled(false);
				Xrm.Page.getAttribute("fmc_2payeenameid").setRequiredLevel("required");
				
				// Enable percentage specification for the first payee
				Xrm.Page.getControl("fmc_1stpercentageofpayment").setDisabled(false);
			}
			else{
				var customer = new Array;
				customer = null;
			
				customer =  Xrm.Page.getAttribute("customerid").getValue();

				if (customer[0] != null){
					if(customer[0].typename == 'contact'){
						Xrm.Page.getControl("fmc_socialsecuritynumber2").setDisabled(true);
						Xrm.Page.getAttribute("fmc_socialsecuritynumber2").setRequiredLevel("none");
					}
					
					if (customer[0].typename == 'account'){
						Xrm.Page.getControl("fmc_businessfederaltaxidnumber").setDisabled(true);
						Xrm.Page.getAttribute("fmc_businessfederaltaxidnumber").setRequiredLevel("nobe");
					}
				}
				
				Xrm.Page.getControl("fmc_2ndpayexplanation").setDisabled(true);
				
				Xrm.Page.getControl("fmc_percentageofpayment").setDisabled(true);
				Xrm.Page.getAttribute("fmc_percentageofpayment").setRequiredLevel("none");

				Xrm.Page.getControl("fmc_2payeenameid").setDisabled(true);
				Xrm.Page.getAttribute("fmc_2payeenameid").setRequiredLevel("none");
				
				// Disable percentage specification for the first payee
				Xrm.Page.getAttribute("fmc_1stpercentageofpayment").setValue(null);
				Xrm.Page.getControl("fmc_1stpercentageofpayment").setDisabled(true);
				Xrm.Page.getAttribute("fmc_1stpercentageofpayment").setSubmitMode("always");
			}
		}
		else{
			alert('Complaintant field must be populated before you can proceed.');
			Xrm.Page.getAttribute("fmc_multiplepayee").setValue(false);
		}
	}
	function customerid_onchange(){
		if (Xrm.Page.getAttribute("customerid").getValue() != null){
		   PayeeTabProperties();
		}
	}
	
	function casetypecode_onchange(){
		var ACTIVITY_STATUS_NEW = '1';
		var ACTIVITY_STATUS_PENDING_INVESTIGATION = '2';
		
		//EnableDisableActivityStatus();
		
		if (Xrm.Page.getAttribute("casetypecode").getText() == "Product Assurance"){
			Xrm.Page.getControl("fmc_datereceived").setDisabled(true);
			Xrm.Page.getAttribute("fmc_datereceived").setRequiredLevel("none");
			//ShowHideTabs();
			//SetDefectiveProductionrequiredLevel(false);
			//SetComplaintAttributesRequiredLevel(false);
			Xrm.Page.ui.tabs.get("ComplaintDetails").setVisible(true);
			Xrm.Page.getControl("fmc_activitystatus").setDisabled(true);
			
			if (Xrm.Page.getAttribute("fmc_activitystatus").getValue() == null || Xrm.Page.getAttribute("fmc_activitystatus").getValue() == ACTIVITY_STATUS_NEW || Xrm.Page.getAttribute("fmc_activitystatus").getValue() == ACTIVITY_STATUS_PENDING_INVESTIGATION){
				Xrm.Page.getControl("fmc_settlementamount").setDisabled(false);		    
			}
		}
		if (Xrm.Page.getAttribute("casetypecode").getText() == "Defective Product Advisory"){
			Xrm.Page.getControl("fmc_datereceived").setDisabled(true);
			Xrm.Page.getAttribute("fmc_datereceived").setRequiredLevel("none");
			//ShowHideTabs();
			//SetDefectiveProductionrequiredLevel("required");
			//SetComplaintAttributesRequiredLevel("none");
			Xrm.Page.ui.tabs.get("ComplaintDetails").setVisible(false);
			Xrm.Page.getControl("fmc_activitystatus").setDisabled(false);
			
		}
		if (Xrm.Page.getAttribute("casetypecode").getText() == "Complaint"){
			Xrm.Page.getControl("fmc_datereceived").setDisabled(false);
			Xrm.Page.getAttribute("fmc_datereceived").setRequiredLevel("required");
			//ShowHideTabs();
			//SetComplaintAttributesRequiredLevel("required");
			//SetDefectiveProductionrequiredLevel("none");
			Xrm.Page.ui.tabs.get("ComplaintDetails").setVisible(true);
			Xrm.Page.getControl("fmc_activitystatus").setDisabled(true);
			
			if (Xrm.Page.getAttribute("fmc_activitystatus").getValue() == null || Xrm.Page.getAttribute("fmc_activitystatus").getValue() == ACTIVITY_STATUS_NEW || Xrm.Page.getAttribute("fmc_activitystatus").getValue() == ACTIVITY_STATUS_PENDING_INVESTIGATION){
				Xrm.Page.getControl("fmc_settlementamount").setDisabled(false);		    
			}
		}
	}
	function ownerid_onchange(){
			OnOwnerChange();
	}
	function fmc_natureofproblems_onchange(){
		SetTypeOfProblem();
	}
	function fmc_multiplepayee_onchange(){
		MultiplePayee_OnChange();
	}
	function fmc_approvedenycomplaintstatus_onchange(){
		var STATUS_APPROVED = 3;
		
		if(Xrm.Page.getAttribute("fmc_approvedenycomplaintstatus").getValue() == STATUS_APPROVED){
			HideShowCheckFields(true);
			
		}
		else{
			 HideShowCheckFields(false);
		}
	}


	//Submit the price quote
	function window.SubmitComplaint(){
		if	(confirm("Submit this Complaint?")){
			Xrm.Page.getAttribute("fmc_settlementamount").setRequiredLevel("required");
			Xrm.Page.getAttribute("statuscode").setValue(100000006);
			Xrm.Page.getAttribute("statuscode").setSubmitMode("always");
			Xrm.Page.getAttribute("fmc_approvalstatus").setValue(100000000);
			Xrm.Page.getAttribute("fmc_approvalstatus").setSubmitMode("always");

			Xrm.Page.data.entity.save();
		}
	}
	function window.ApproveComplaint(){
		if (confirm("Approve this Complaint?")){
			Xrm.Page.getAttribute("fmc_approvalstatus").setValue(100000001);
			Xrm.Page.getAttribute("fmc_approvalstatus").setSubmitMode("always");
			Xrm.Page.data.entity.save();
		}
	}

	function window.RejectComplaint(){
		if (confirm("Reject this Complaint?")){
			var New = 1;
			var Rejected = 100000002;
			Xrm.Page.getAttribute("fmc_approvalstatus").setValue(Rejected);
			Xrm.Page.getAttribute("fmc_approvalstatus").setSubmitMode("always");
			Xrm.Page.getAttribute("statuscode").setValue(New);
			Xrm.Page.getAttribute("statuscode").setSubmitMode("always");

			Xrm.Page.data.entity.save();
		}
	}

