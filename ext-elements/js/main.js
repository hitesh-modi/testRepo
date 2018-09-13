class MyBusinessCardElement extends HTMLElement {

    constructor() {
        super();
        this.displayName = "Mr. X";
        this._ref = null;
    }

    set name(attributeValue) {
        this.setAttribute("name", attributeValue);
    }

    get name() {
        return this.getAttribute("name");
    }

    // This method sets the name of the attribute that should be watches for changes
    static get observedAttributes() { return ["name"]; }

    // This lifecycle method is called when any attribute value changes in the element
    attributeChangedCallback(name, oldValue, newValue) {
        this.displayName = newValue;
    }

    connectedCallback() {
        var _ref = this;
        var name = this.displayName;
        Ext.onReady(
            function () {

                Ext.create('Ext.form.FormPanel',
                    {
                        renderTo: "helloWorldPanel",
                        autoHeight: true,
                        width: 600,
                        bodyStyle: "padding:5px",
                        title: 'Hello World',
                        html: 'Hello, Mr. ' + name,
                        items:
                            [
                                {
                                    xtype: "textarea",
                                    name: "comment",
                                    value: "",
                                    fieldLabel: "Comment"
                                },
                                {
                                    xtype: "combo",
                                    displayField: "name",
                                    fieldLabel: "Layout",
                                    typeAhead: true,
                                    mode: "local",
                                    triggerAction: "all"
                                },
                                {
                                    xtype: "combo",
                                    displayField: "name",
                                    fieldLabel: "Resolution",
                                    tpl: '<tpl for="."><div class="x-combo-list-item">{name} dpi</div></tpl>',
                                    typeAhead: true,
                                    mode: "local",
                                    triggerAction: "all",

                                    // the plugin will work even if we modify a combo value
                                    setValue: function (v) {
                                        v = parseInt(v) + " dpi";
                                        Ext.form.ComboBox.prototype.setValue.apply(this, arguments);
                                    }
                                },
                                {
                                    xtype: "combo",
                                    displayField: "name",
                                    fieldLabel: "Scale",
                                    typeAhead: true,
                                    mode: "local",
                                    triggerAction: "all",
                                },
                                {
                                    xtype: "textfield",
                                    name: "rotation",
                                    fieldLabel: "Rotation"
                                }
                            ],
                        buttons:
                            [
                                {
                                    text: "Create PDF",
                                    handler: function () {
                                        // convenient way to fit the print page to the visible map area
                                        var message = "This message can be anything in control of custom element";
                                        notifyUser("Message from custom element");
                                    }
                                }
                            ]
                    }
                )
            }
        )

        function notifyUser(message) {
            console.log('Notifying the user with message ', message);
            console.log(_ref);
            _ref.dispatchEvent(new CustomEvent('notify-message', {detail: message}));
        };

    }


    

}

window.customElements.define("business-card", MyBusinessCardElement);