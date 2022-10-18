/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget','N/search'],
    
    (serverWidget,search) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {
            var html = '<html><body><h1 style="color:red" align="center" >User Training</h1></body></html>';
            scriptContext.response.write(html);
            scriptContext.response.setHeader({
                name: 'Custom-Header-Demo',
                value: 'Demo'});

            var form = serverWidget.createForm({title: 'User Training'});
            var usertraining = form.addFieldGroup({id: 'usertraining',label:'User Training'});


            var name1 = form.addField({id: 'namefield',type: serverWidget.FieldType.TEXT,label: 'Name',container:'usertraining'});
            var dept1 = form.addField({id: 'depfield',type: serverWidget.FieldType.TEXT,label: 'Department',container:'usertraining'});
            var personalinfo = form.addFieldGroup({id: 'personalinfogroup',label: 'Personal Information'});
            var email = form.addField({
                id: 'emailfield',
                type: serverWidget.FieldType.TEXT,
                label: "Email",
                container: 'personalinfogroup'
            });
            var phone = form.addField({
                id: 'phonefield',
                type: serverWidget.FieldType.TEXT,
                label: "Phone",
                container: 'personalinfogroup'
            });
            form.addSubtab({
                id: 'subtab1id',
                label: 'Training Information',

            });
            let sublist = form.addSublist({
                id: 'sublist',
                type: serverWidget.SublistType.INLINEEDITOR,
                label: 'Training Session',
                tab:'subtab1id'
            });
            sublist.addField({
                id: 'sublist1',
                type: serverWidget.FieldType.TEXT,
                label: 'CUSTOMER',
                //tab:'subtab1id'
            });

           //session.addSelectOption({text:'session1',value:'session1'});
           // session.addSelectOption({text:'session2',value:'session2'});

            sublist.addField({
                id: 'sublist2',
                type: serverWidget.FieldType.TEXT,
                label: 'SUBSIDIARY'
            });
            sublist.addField({
                id: 'sublist3',
                type: serverWidget.FieldType.DATE,
                label: 'DATE'
            });

            var search_salesorder=search.create({
                type:search.Type.SALES_ORDER,
                id:'search_order',

                columns:['entity','subsidiary','trandate'],
                filters:[['mainline','is','T']]
            });

            var resultsearch=search_salesorder.run().getRange({
                start:0,
                end:20
            });
            for(var i=0;i<resultsearch.length;i++)
            {
                var entity=resultsearch[i].getText({
                    name:'entity'
                });
                sublist.setSublistValue({
                    id:'sublist1',
                    line:i,
                    value:entity
                });
                var subsidiary=resultsearch[i].getText({
                    name:'subsidiary'
                });
                sublist.setSublistValue({
                    id:'sublist2',
                    line:i,
                    value:subsidiary
                });
                var trandate=resultsearch[i].getValue({
                    name:'trandate'
                });
                sublist.setSublistValue({
                    id:'sublist3',
                    line:i,
                    value:trandate
                });


            }





            scriptContext.response.write(html);

            scriptContext.response.writePage(form);
        }

        return {onRequest}

    });
