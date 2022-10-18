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
            var filterarray=[];
            var form = serverWidget.createForm({title: 'salesorder information'});
form.clientScriptFileId=10093;
                var customer = form.addField({
                    id: 'customer',
                    type: serverWidget.FieldType.SELECT,
                    label: 'customer',
                    source: 'customer'
                });
            customer.defaultValue=scriptContext.request.parameters.value_of_customer;

                var subsidiary = form.addField({
                    id: 'subsidiary',
                    type: serverWidget.FieldType.SELECT,
                    label: 'subsidiary',
                    source: 'subsidiary'
                });
            subsidiary.defaultValue=scriptContext.request.parameters.value_of_subsidiary;

                var statusname = form.addField({
                    id: 'statusname',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Status',


                });


                statusname.addSelectOption({text: '', value: ''});
                statusname.addSelectOption({text: 'Sales Order:Pending Approval', value: 'SalesOrd:A'});
                statusname.addSelectOption({text: 'Sales Order:Pending Fulfillment', value: 'SalesOrd:B'});
                statusname.addSelectOption({text: 'Sales Order:Cancelled', value: 'SalesOrd:C'});
                statusname.addSelectOption({text: 'Sales Order:Partially Fulfilled', value: 'SalesOrd:D'});
                statusname.addSelectOption({text: 'Sales Order:Pending Billing/Partially Fulfilled', value: 'SalesOrd:E'});
            statusname.addSelectOption({text: 'Sales Order:Pending Billing', value: 'SalesOrd:F'});
            statusname.addSelectOption({text: 'Sales Order:Billed', value: 'SalesOrd:G'});
            statusname.addSelectOption({text: 'Sales Order:Closed', value: 'SalesOrd:H'});
            statusname.defaultValue=scriptContext.request.parameters.value_of_status;
                var department = form.addField({
                    id: 'department',
                    type: serverWidget.FieldType.SELECT,
                    label: 'department',
                    source: 'department'
                });
                department.defaultValue=scriptContext.request.parameters.value_of_department;
            let sublist = form.addSublist({
                id: 'sublist',
                type: serverWidget.SublistType.INLINEEDITOR,
                label: 'salesorder search',
                tab:'subtab1id'
            });
            sublist.addField({
                id: 'customer',
                type: serverWidget.FieldType.TEXT,
                label: 'CUSTOMER',

            });



            sublist.addField({
                id: 'subsidiary',
                type: serverWidget.FieldType.TEXT,
                label: 'SUBSIDIARY'
            });
            sublist.addField({
                id: 'date',
                type: serverWidget.FieldType.DATE,
                label: 'DATE'
            });
            sublist.addField({
                id: 'status',
                type: serverWidget.FieldType.TEXT,
                label: 'status'
            });
            sublist.addField({
                id: 'total',
                type: serverWidget.FieldType.TEXT,
                label: 'total'
            });
            sublist.addField({
                id: 'department',
                type: serverWidget.FieldType.TEXT,
                label: 'department'
            });
            sublist.addField({
                id: 'class',
                type: serverWidget.FieldType.TEXT,
                label: 'class'
            });

            sublist.addField({
                id: 'subtotal',
                type: serverWidget.FieldType.TEXT,
                label: 'subtotal'
            });
            sublist.addField({
                id: 'internalid',
                type: serverWidget.FieldType.TEXT,
                label: 'internalid'
            });
            sublist.addField({
                id: 'taxtotal',
                type: serverWidget.FieldType.TEXT,
                label: 'taxtotal'
            });
            sublist.addField({
                id:'line',
                type:serverWidget.FieldType.TEXT,
                label:'line'
            })
            if (scriptContext.request.parameters.value_of_status) {
                var statusFilter = scriptContext.request.parameters.value_of_status;
                filterarray.push(['status', search.Operator.ANYOF, statusFilter]);
                filterarray.push('and');
            }
            log.debug(scriptContext.request.parameters.value_of_status)
            if (scriptContext.request.parameters.value_of_customer) {
                var customerFilter = scriptContext.request.parameters.value_of_customer;
                filterarray.push(['entity', search.Operator.ANYOF, customerFilter]);
                filterarray.push('and');
            }
            log.debug(scriptContext.request.parameters.value_of_customer)
            if (scriptContext.request.parameters.value_of_subsidiary) {
                var subsidiaryFilter = scriptContext.request.parameters.value_of_subsidiary;
                filterarray.push(['subsidiary', search.Operator.ANYOF, subsidiaryFilter]);
                filterarray.push('and');
            }
            log.debug(scriptContext.request.parameters.value_of_subsidiary)
            if (scriptContext.request.parameters.value_of_department) {
                var departmentFilter = scriptContext.request.parameters.value_of_department;
                filterarray.push(['department', search.Operator.ANYOF, departmentFilter]);
                filterarray.push('and');
            }
            log.debug(scriptContext.request.parameters.value_of_department)

            filterarray.pop();
            var search_salesorder=search.create({
                type:search.Type.SALES_ORDER,
                id:'search_order',

                columns:['entity','subsidiary','trandate','status','total','department','class','internalid','taxtotal','discountamount','shippingamount','line'],
                filters:filterarray
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

                if(entity){
                    log.debug(entity);
                    sublist.setSublistValue({
                        id:'customer',
                        line:i,
                        value:entity
                    });
                }

                var subsidiary=resultsearch[i].getText({
                    name:'subsidiary'
                });
                if(subsidiary){
                    log.debug(subsidiary);
                    sublist.setSublistValue({
                        id:'subsidiary',
                        line:i,
                        value:subsidiary
                    });
                }

                var trandate=resultsearch[i].getValue({
                    name:'trandate'
                });
                if(trandate){
                    log.debug(trandate);
                    sublist.setSublistValue({
                        id:'date',
                        line:i,
                        value:trandate
                    });
                }

                var status=resultsearch[i].getValue({
                    name:'status'
                });
                if(status){
                    log.debug(status);
                    sublist.setSublistValue({
                        id:'status',
                        line:i,
                        value:status
                    });
                }


                var total=resultsearch[i].getValue({
                    name:'total'
                });
                if(total){
                    log.debug(total);
                    sublist.setSublistValue({
                        id:'total',
                        line:i,
                        value:total
                    });
                }


                var department=resultsearch[i].getText({
                    name:'department'
                });
                if(department){
                    log.debug(department);
                    sublist.setSublistValue({
                        id:'department',
                        line:i,
                        value:department
                    });
                }

                var classname=resultsearch[i].getText({
                    name:'class'
                });
                if(classname){
                    log.debug(classname);
                    sublist.setSublistValue({
                        id:'class',
                        line:i,
                        value:classname
                    });
                }
                var total1=parseFloat(+resultsearch[i].getValue({name:'total'}))
                var tax1=parseFloat(+resultsearch[i].getValue({name:'taxtotal'}));
                  var shipping=parseFloat(+resultsearch[i].getValue({name:'shippingamount'}));
                var discount=parseFloat(+resultsearch[i].getValue({name:"discountamount"}));
                var resultvalue=total1-discount-tax1-shipping;

                if(resultvalue){
                    sublist.setSublistValue({
                        id:'subtotal',
                        line:i,
                        value:resultvalue
                    });
                }
                var internalid=resultsearch[i].getText({
                    name:'internalid'
                });
                if(internalid){
                    log.debug(internalid);
                    sublist.setSublistValue({
                        id:'internalid',
                        line:i,
                        value:internalid
                    });
                }

                var taxtotal=resultsearch[i].getText({
                    name:'taxtotal'
                });
                if(taxtotal){
                    log.debug(taxtotal);
                    sublist.setSublistValue({
                        id:'taxtotal',
                        line:i,
                        value:taxtotal
                    });
                }

                var line=resultsearch[i].getValue({
                    name:'line'
                });

                    log.debug(line);
                    sublist.setSublistValue({
                        id:'line',
                        line:i,
                        value:line
                    });


            }


            scriptContext.response.writePage(form);
        }

        return {onRequest}

    });



