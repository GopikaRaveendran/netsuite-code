/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/record', 'N/ui/serverWidget','N/search'],
    /**
 * @param{record} record
 * @param{serverWidget} serverWidget
 */
    (record, serverWidget,search) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {

            if (scriptContext.request.method === 'GET') {
                var form = serverWidget.createForm({title: 'customer information'});
                var primarytraining = form.addFieldGroup({id: 'primarytraining', label: 'Primary Information'});
                form.clientScriptFileId=9680;


                var companyname1 = form.addField({
                    id: 'companyinformationfield',
                    type: serverWidget.FieldType.TEXT,
                    label: 'COMPANY NAME',
                    container: 'primarytraining'
                });





                var sales_rep = form.addField({
                    id: 'repfield',
                    type: serverWidget.FieldType.SELECT,
                    label: 'SALES REP',
                    container: 'primarytraining'
                });


                sales_rep.addSelectOption({text:'Joel S Metzger',value:'Joel S Metzger'});
                sales_rep.addSelectOption({text:'Will O Clark',value:'Will O Clark'});










                var name1 = form.addField({
                    id: 'subfield',
                    type: serverWidget.FieldType.SELECT,
                    label: 'SUBSIDIARY',
                    container: 'primarytraining'
                });
                //subsidiary.addSelectOption({text:'Canara',value:'Canara'});
                //subsidiary.addSelectOption({text:'Australia',value:'Australia'});
                //subsidiary.addSelectOption({text:'Argentina',value:'Argentina'});
                //subsidiary.addSelectOption({text:'Brazil',value:'Brazil'});

                var search_customer = search.create({
                    type: search.Type.SUBSIDIARY,
                    id: 'search_customer',

                    columns: ['name'],

                });

                var resultsearch = search_customer.run().getRange({
                    start: 0,
                    end: 5
                });
                //resultsearch.save();
                search_customer.save();
                log.debug(resultsearch);
                for (var i = 0; i < resultsearch.length; i++) {
                    var name = resultsearch[i].getValue({
                        name: 'name'
                    });
                    name1.addSelectOption({
                        text: name,
                        value: name
                    });
                }
                var submit = form.addSubmitButton({
                    id: 'submit',
                    label: 'Save'
                });

                var email = form.addField({
                    id: 'emailfield',
                    type: serverWidget.FieldType.TEXT,
                    label: "Email",
                    container: 'primarytraining'
                });
                var phone = form.addField({
                    id: 'phonefield',
                    type: serverWidget.FieldType.TEXT,
                    label: "Phone",
                    container: 'primarytraining'
                });
                var classification = form.addFieldGroup({id: 'classification', label: 'classification'});
                var annual_revenue = form.addField({
                    id: 'annualfield',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Annual Revenue',
                    container: 'classification'
                });
                var no_of_employees = form.addField({
                    id: 'no_of_emp_field',
                    type: serverWidget.FieldType.TEXT,
                    label: 'no.of Employees',
                    container: 'classification'
                });
                var emailaddress = form.addField({
                    id: 'emailaddressfield',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Email address for payment notification',
                    container: 'classification'
                });






                scriptContext.response.writePage(form);


            }
            else{
                var companyinfo =scriptContext.request.parameters.companyinformationfield;
                var repinfo=scriptContext.request.parameters.repfield;
                var subinfo=scriptContext.request.parameters.subfield;
                var emailinfo=scriptContext.request.parameters.emailfield;

                var phoneinfo=scriptContext.request.parameters.phonefield;
                var annual_info=scriptContext.request.parameters.annualfield;
                var no=scriptContext.request.parameters.no_of_emp_field;
                var emailaddress=scriptContext.request.parameters.emailaddressfield;

                scriptContext.response.write('You have entered:'
                    + '<br/> Company: ' + companyinfo
                    + '<br/> Sales Rep: ' + repinfo
                    + '<br/> Subsidiary: ' + subinfo
                    + '<br/> Email: ' + emailinfo
                    + '<br/> Phone: ' + phoneinfo

                    + '<br/> Annual Info: ' + annual_info
                    + '<br/> Number of employee field: ' + no
                    + '<br/> Email address field: ' + emailaddress);

                var createCustomer=record.create({
                    type:record.Type.CUSTOMER,
                    isDynamic:true

                });
                createCustomer.setValue({
                    fieldId:'companynamepost',
                    value:companyinfo
                });
               createCustomer.setText({
                   fieldId:'subpost',
                   value:subinfo
               });
              createCustomer.setValue({
                   fieldId:'emailpost',
                   value:emailinfo
               });
                createCustomer.setValue({
                    fieldId:'phonepost',
                    value:phoneinfo
                });
               createCustomer.setValue({
                    fieldId:'annualpost',
                    value:annual_info
                });
                createCustomer.setValue({
                    fieldId:'nopost',
                    value:no

                });
                createCustomer.setValue({
                    fieldId:'emailaddresspost',
                    value:emailaddress

                });

            }
        }

        return {onRequest}

    });
