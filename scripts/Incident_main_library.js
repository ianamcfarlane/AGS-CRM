function Form_onload(){
	checkApprover();
	//statuscodeReadOnly();
	if (Xrm.Page.context.client.getClient() == 'Web'){
		showHideTabs(); 
	}
	approveRequiresSettlement();
	
	if (Xrm.Page.ui.getFormType() == 1){	
		setComplaintApprover();
	}
}

function approveRequiresSettlement(){
	if (Xrm.Page.getAttribute("fmc_approvedenycomplaintstatus").getValue() == 3){
		Xrm.Page.getAttribute("fmc_settlementamount").setRequiredLevel("required");
	}
	else{
		Xrm.Page.getAttribute("fmc_settlementamount").setRequiredLevel("none");
	}
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
	var temp = retrieveRecordsReq.send();
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

function checkApprover(){
	Xrm.Page.getControl("fmc_approver").setDisabled(true);
	var approver = Xrm.Page.getAttribute("fmc_approver");
	if (approver != null && approver != undefined) {
		var approverValue = approver.getValue();
        if (approverValue != null) {
			var approverId = approverValue[0].id;
            if (approverId != null) {
				var user = Xrm.Page.context.getUserId();
				if (user == approverId) {
					Xrm.Page.getControl("fmc_approvedenycomplaintstatus").setDisabled(false);
				}
				else if (Xrm.Page.context.client.getClient() == 'Web'){
					if (UserHasRole("System Administrator")){
						Xrm.Page.getControl("fmc_approver").setDisabled(false);
						Xrm.Page.getControl("fmc_approvedenycomplaintstatus").setDisabled(false);
					}
				}
				else {
					Xrm.Page.getControl("fmc_approvedenycomplaintstatus").setDisabled(true);
				 }
			}
		}
	}
}


function statuscodeReadOnly(){
	if (UserHasRole("System Administrator")){
		Xrm.Page.getControl("statuscode").setDisabled(false);
	}
	else{
		Xrm.Page.getControl("statuscode").setDisabled(true);
	}	
}
			
function showHideTabs(){
	switch(Xrm.Page.getAttribute("casetypecode").getText()){
		case "Product Assurance":
			Xrm.Page.ui.tabs.get("ComplaintDetails").setVisible(true);
			Xrm.Page.ui.tabs.get("Payee").setVisible(true);
			Xrm.Page.ui.tabs.get("General").sections.get("ComplaintApproval").setVisible(true);
			Xrm.Page.ui.tabs.get("General").sections.get("PaymentInformation").setVisible(true);
			Xrm.Page.ui.tabs.get("DefectiveProduct").setVisible(false);
			if (Xrm.Page.context.client.getClient() == 'Web'){
				Xrm.Page.ui.tabs.get("DefectiveProductAdvisory").setVisible(false);
			}
			
			Xrm.Page.getAttribute("fmc_reporttype").setRequiredLevel("required");
			Xrm.Page.getAttribute("fmc_cropid").setRequiredLevel("required");
			Xrm.Page.getAttribute("fmc_complainttype").setRequiredLevel("required");
			Xrm.Page.getAttribute("fmc_rateacre").setRequiredLevel("required");
			Xrm.Page.getAttribute("fmc_unitofmeasure").setRequiredLevel("required");
			Xrm.Page.getAttribute("fmc_acresincomplaint").setRequiredLevel("required");
			Xrm.Page.getAttribute("fmc_weedsinsectsdiseaseinfield").setRequiredLevel("required");
			
			Xrm.Page.getAttribute("fmc_distributorid").setRequiredLevel("none");
			Xrm.Page.getAttribute("fmc_lotnumber1").setRequiredLevel("none");
			Xrm.Page.getAttribute("fmc_natureofproblems").setRequiredLevel("none");
			Xrm.Page.getAttribute("fmc_numberofcartons").setRequiredLevel("none");
			Xrm.Page.getAttribute("fmc_numberofcontainers").setRequiredLevel("none");
			Xrm.Page.getAttribute("fmc_typeofproblem").setRequiredLevel("none");
			
			break;
		case "Complaint":
			Xrm.Page.ui.tabs.get("ComplaintDetails").setVisible(true);
			Xrm.Page.ui.tabs.get("Payee").setVisible(true);
			Xrm.Page.ui.tabs.get("General").sections.get("ComplaintApproval").setVisible(true);
			Xrm.Page.ui.tabs.get("General").sections.get("PaymentInformation").setVisible(true);
			Xrm.Page.ui.tabs.get("DefectiveProduct").setVisible(false);
			if (Xrm.Page.context.client.getClient() == 'Web'){
				Xrm.Page.ui.tabs.get("DefectiveProductAdvisory").setVisible(false);
			}
				
			
			Xrm.Page.getAttribute("fmc_reporttype").setRequiredLevel("required");
			Xrm.Page.getAttribute("fmc_cropid").setRequiredLevel("required");
			Xrm.Page.getAttribute("fmc_complainttype").setRequiredLevel("required");
			Xrm.Page.getAttribute("fmc_rateacre").setRequiredLevel("required");
			Xrm.Page.getAttribute("fmc_unitofmeasure").setRequiredLevel("required");
			Xrm.Page.getAttribute("fmc_acresincomplaint").setRequiredLevel("required");
			Xrm.Page.getAttribute("fmc_weedsinsectsdiseaseinfield").setRequiredLevel("required");
			
			Xrm.Page.getAttribute("fmc_distributorid").setRequiredLevel("none");
			Xrm.Page.getAttribute("fmc_lotnumber1").setRequiredLevel("none");
			Xrm.Page.getAttribute("fmc_natureofproblems").setRequiredLevel("none");
			Xrm.Page.getAttribute("fmc_numberofcartons").setRequiredLevel("none");
			Xrm.Page.getAttribute("fmc_numberofcontainers").setRequiredLevel("none");
			Xrm.Page.getAttribute("fmc_typeofproblem").setRequiredLevel("none");
			break;
		case "Defective Product Advisory":	
			Xrm.Page.ui.tabs.get("ComplaintDetails").setVisible(false);
			Xrm.Page.ui.tabs.get("Payee").setVisible(false);
			Xrm.Page.ui.tabs.get("DefectiveProduct").setVisible(true);
			if (Xrm.Page.context.client.getClient() == 'Web'){
				Xrm.Page.ui.tabs.get("DefectiveProductAdvisory").setVisible(true);
			}
			Xrm.Page.ui.tabs.get("General").sections.get("PaymentInformation").setVisible(false);
			Xrm.Page.ui.tabs.get("General").sections.get("ComplaintApproval").setVisible(false);
			
			Xrm.Page.getAttribute("fmc_reporttype").setRequiredLevel("none");
			Xrm.Page.getAttribute("fmc_cropid").setRequiredLevel("none");
			Xrm.Page.getAttribute("fmc_complainttype").setRequiredLevel("none");
			Xrm.Page.getAttribute("fmc_rateacre").setRequiredLevel("none");
			Xrm.Page.getAttribute("fmc_unitofmeasure").setRequiredLevel("none");
			Xrm.Page.getAttribute("fmc_acresincomplaint").setRequiredLevel("none");
			Xrm.Page.getAttribute("fmc_weedsinsectsdiseaseinfield").setRequiredLevel("none");
			
			Xrm.Page.getAttribute("fmc_distributorid").setRequiredLevel("required");
			Xrm.Page.getAttribute("fmc_lotnumber1").setRequiredLevel("required");
			Xrm.Page.getAttribute("fmc_natureofproblems").setRequiredLevel("required");
			Xrm.Page.getAttribute("fmc_numberofcartons").setRequiredLevel("required");
			Xrm.Page.getAttribute("fmc_numberofcontainers").setRequiredLevel("required");
			Xrm.Page.getAttribute("fmc_typeofproblem").setRequiredLevel("required");
			
			break;
		default:
	}
}
	
function customerid_onchange(){
	if (Xrm.Page.getAttribute("customerid").getValue() != null){
	   var customer = new Array;
		customer = null;
		customer =  Xrm.Page.getAttribute("customerid").getValue();

		if (customer[0] != null && (Xrm.Page.getAttribute("casetypecode").getValue() == 1 || Xrm.Page.getAttribute("casetypecode").getValue() == 2)){
			if(customer[0].typename == 'contact'){
				
				Xrm.Page.getAttribute("fmc_1stpayeeaccountid").setValue("");
				Xrm.Page.getControl("fmc_1stpayeeaccountid").setDisabled(true);
				Xrm.Page.getAttribute("responsiblecontactid").setValue(customer);
			}	
			else {
				
				Xrm.Page.getAttribute("responsiblecontactid").setValue("");
				Xrm.Page.getControl("responsiblecontactid").setDisabled(false);
			
				Xrm.Page.getAttribute("fmc_1stpayeeaccountid").setValue(customer);
			}
		}
	}
}
	
function casetypecode_onchange(){
	showHideTabs();
	if (Xrm.Page.getAttribute("casetypecode").getText() == "Complaint"){
		Xrm.Page.getAttribute("fmc_datereceived").setRequiredLevel("required");
	}
	else{
		Xrm.Page.getAttribute("fmc_datereceived").setRequiredLevel("none");
	}
}

function fmc_natureofproblems_onchange(){
	var PROBLEMNATURE_DEFECTIVE_PACKAGE_PICKLIST_VALUE = 1;
	var PROBLEMNATURE_DEFECTIVE_PRODUCT_PICKLIST_VALUE = 2;

	var PROBLEMTYPE_SOILED_PACKAGE_PICKLIST_VALUE = 1;
	var PROBLEMTYPE_TORN_PACKAGE_PICKLIST_VALUE = 2;
	var PROBLEMTYPE_OLD_PACKAGE_PICKLIST_VALUE = 3;
	var PROBLEMTYPE_LABEL_MISSING_PICKLIST_VALUE = 4;
	var PROBLEMTYPE_CONTAINER_LEAKING_PICKLIST_VALUE = 5;
	var PROBLEMTYPE_CONTAINER_SOILED_PICKLIST_VALUE = 6;
	var PROBLEMTYPE_PARTIAL_CONTAINER_PICKLIST_VALUE = 7;
	var PROBLEMTYPE_LAKING_CAP_PICKLIST_VALUE = 8;
	var PROBLEMTYPE_MISSING_CONTAINER_PICKLIST_VALUE = 9;
	var PROBLEMTYPE_PRODUCT_LUMPY_PICKLIST_VALUE = 10;
	
	var PROBLEMTYPE_PRODUCT_THICK_PICKLIST_VALUE = 11;
	var PROBLEMTYPE_NON_MIXING_PICKLIST_VALUE = 12;
	var PROBLEMTYPE_OTHER_PICKLIST_VALUE = 13;
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
					if (
						 optionValue == PROBLEMTYPE_PRODUCT_LUMPY_PICKLIST_VALUE ||
						 optionValue == PROBLEMTYPE_PRODUCT_THICK_PICKLIST_VALUE ||
						 optionValue == PROBLEMTYPE_NON_MIXING_PICKLIST_VALUE ||
						 optionValue == PROBLEMTYPE_OTHER_PICKLIST_VALUE
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

