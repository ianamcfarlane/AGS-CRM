
function copyAddress(){
	if (confirm('Do you want to copy AGIIS Physical and Mailing Address to Physical and Mailing Address on CRM Address Tab?')){
		 //Copy Physical Address
		Xrm.Page.getAttribute("address1_line1").setValue(Xrm.Page.getAttribute("fmc_address3street1").getValue());
		Xrm.Page.getAttribute("address2_line1").setValue(Xrm.Page.getAttribute("fmc_address3street1").getValue());
		
		Xrm.Page.getAttribute("address1_line2").setValue(Xrm.Page.getAttribute("fmc_address3street2").getValue());
		Xrm.Page.getAttribute("address2_line2").setValue( Xrm.Page.getAttribute("fmc_address3street2").getValue() );
		
		Xrm.Page.getAttribute("address2_city").setValue(Xrm.Page.getAttribute("fmc_address3city").getValue());
		Xrm.Page.getAttribute("address1_city").setValue(Xrm.Page.getAttribute("fmc_address3city").getValue());
		
		Xrm.Page.getAttribute("address2_postalcode").setValue(Xrm.Page.getAttribute("fmc_address3zip").getValue());
		Xrm.Page.getAttribute("address1_postalcode").setValue(Xrm.Page.getAttribute("fmc_address3zip").getValue());
		
		if (Xrm.Page.getAttribute("fmc_address3stateagiis").getValue() != null){
			Xrm.Page.getAttribute("fmc_physicalstateid").setValue(Xrm.Page.getAttribute("fmc_address3stateagiis").getValue());
			Xrm.Page.getAttribute("fmc_mailingstateid").setValue(Xrm.Page.getAttribute("fmc_address3stateagiis").getValue());
		}
		if (Xrm.Page.getAttribute("fmc_address3countyagiis").getValue() != null){ 
			Xrm.Page.getAttribute("fmc_physicalcountyid").setValue(Xrm.Page.getAttribute("fmc_address3countyagiis").getValue());
			Xrm.Page.getAttribute("fmc_mailingcountyid").setValue(Xrm.Page.getAttribute("fmc_address3countyagiis").getValue());
		}
		else {
			window.setCounty();
		}
		Xrm.Page.getAttribute("fmc_fipscode").setValue(Xrm.Page.getAttribute("fmc_agiisphysicalfipscode").getValue());
		Xrm.Page.getAttribute("fmc_fipscode").setSubmitMode("always");
		Xrm.Page.getAttribute("fmc_mailingfipscode").setValue(Xrm.Page.getAttribute("fmc_agiisphysicalfipscode").getValue());
		Xrm.Page.getAttribute("fmc_mailingfipscode").setSubmitMode("always");
		
	}
}
