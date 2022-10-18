/**
 *@NApiVersion 2.1
 *@NScriptType Suitelet
 */

define(['N/record', 'N/search', 'N/ui/serverWidget','N/email','N/runtime'],
    function(record, search, serverWidget,email,runtime) {
        function onRequest(context) {
            try {
                if (context.request.method === 'GET') {

                    var form = serverWidget.createForm({
                        title: 'External entry'
                    });

                    //form.clientScriptFileId  =  10294;

                    //create fields groups to organize the fields



                    var name = form.addField({
                        id: 'name',
                        type: serverWidget.FieldType.TEXT,
                        label: 'name',

                    });
                    name.isMandatory = true;

                    // create a field with the user using this numbers when clicking the button
                    var customername = form.addField({
                        id: 'customername',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Customer Name',

                    });
                    var customeremail = form.addField({
                        id: 'customeremail',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Customer Email',

                    });
                    var subject = form.addField({
                        id: 'subject',
                        type: serverWidget.FieldType.TEXT,
                        label: 'subject',

                    });
                    var message = form.addField({
                        id: 'message',
                        type: serverWidget.FieldType.TEXTAREA,
                        label: 'message',

                    });
                    var refcustomer = form.addField({
                        id: 'refcustomer',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Refference',
                        source:'customer'

                    });


                    // Add the buttons
                    form.addSubmitButton({
                        label: 'submit'
                    });


                    context.response.writePage(form);

                } else {
                    // Section Four - Output - Used in all sections
                    var delimiter = /\u0001/;
                    var name_post = context.request.parameters.name;
                    var customername_post = context.request.parameters.customername;

                    var email_post = context.request.parameters.customeremail;
                    var subject_post=context.request.parameters.subject;
                    var message_post=context.request.parameters.message;
                    var refcustomer_post=context.request.parameters.refcustomer;

                    context.response.write('You have entered:'
                        + '<br/> Name: ' + name_post
                        + '<br/> Customer Name: ' + customername_post
                        + '<br/> Email: ' + email_post
                        + '<br/> Subject: ' + subject_post
                        + '<br/> Message: ' + message_post

                        + '<br/> Reffrence: ' + refcustomer_post
                    );

                    var newentry=record.create({
                        type:'customrecord_jj_training_external_cusrec',
                        isDynamic:true
                    });

                    newentry.setValue({
                        fieldId:'name',
                        value:name_post
                    });
                    newentry.setValue({
                        fieldId:'custrecord_jj_training_cust_name',
                        value:customername_post
                    });
                   newentry.setValue({
                        fieldId:'custrecord_jj_training_cust_email',
                        value:email_post
                    });

                    newentry.setValue({
                        fieldId:'custrecord_jj_training_sub',
                        value:subject_post
                    });
                    newentry.setValue({
                        fieldId:'custrecord_jj_training_msg',
                        value:message_post
                    });
                    newentry.setValue({
                        fieldId:'custrecord_jj_training_c',
                        value:refcustomer_post
                    });
                    var recordId=newentry.save({
                        enableSourcing:false,
                        ignoreMandatoryFields:false
                    });


                    if(recordId){
                        email.send({
                                     author: 5,
                                     recipients: -5,
                                    subject: 'NEW NEW Test Sample Email Module',
                                    body: "New Custom Record form with name "+customername_post
                                });
                    }

                    //create search with id refcustomer_post, get salesrep field
                    //create seartch employee, id sales rep,get email



                }

            } catch (error) {
                log.error({title: 'Failed ', details: error});
            }

        }
        return {
            onRequest: onRequest
        };

    });