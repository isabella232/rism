"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var normalizeCss = require("normalize.css"),
    React = require("react"),
    normalize = require("react-style-normalizer"),
    CleanCSS = require("clean-css"),
    _ = require("lodash"),
    base = require("./base"),
    buttons = require("./buttons"),
    card = require("./card"),
    forms = require("./forms"),
    grid = require("./grid"),
    headings = require("./headings"),
    helpers = require("./helpers"),
    images = require("./images"),
    labels = require("./labels"),
    listGroup = require("./listGroup"),
    nav = require("./nav"),
    sizes = require("./sizes"),
    responsive = require("./responsive"),
    styleObjects = [base, buttons, card, forms, grid, headings, helpers, images, labels, listGroup, nav, sizes],
    recess;

function setPropertyHidden(obj, prop, value) {
    Object.defineProperty(obj, prop, {
        configurable: false,
        enumerable: false,
        value: value,
        writable: true
    });
}

function setPropertyPermanent(obj, prop, value) {
    Object.defineProperty(obj, prop, {
        configurable: false,
        enumerable: true,
        value: value,
        writable: true
    });
}

function setPropertyReadonly(obj, prop, value) {
    Object.defineProperty(obj, prop, {
        configurable: false,
        enumerable: false,
        value: value,
        writable: false
    });
}

function setResponsive(size) {
    _.forOwn(responsive(size), (function (style, key) {
        _.assign(this.styles[key], style);
    }).bind(this));
}

function Recess() {
    setPropertyHidden(this, "_app", undefined);
    setPropertyHidden(this, "_appWarn", true);
    setPropertyReadonly(this, "_component", {});
    setPropertyReadonly(this, "_componentOptions", {});
    setPropertyReadonly(this, "_componentStyles", {});
    setPropertyPermanent(this, "size", sizes.sizeName());
    setPropertyPermanent(this, "styles", {});

    _.forEach(styleObjects, (function (style) {
        _.assign(this.styles, style);
    }).bind(this));

    setResponsive.call(this, this.size);

    Object.preventExtensions(this);

    return this;
}

_.assign(Recess.prototype, {
    application: function application(app) {
        setPropertyReadonly(this, "_app", app);
        return this;
    },

    combine: function combine() {
        var obj = {};

        _.forEach(arguments, function (argument, i) {
            _.merge(obj, argument);
        });

        return obj;
    },

    componentOptions: function componentOptions(component, options) {
        var name;

        if (!this._app && this._appWarn) {
            console.warn("Warning: You haven't created an application, which means each component will be managed independently. This is unavoidable if " + "you are using a different library as your application base, however if you are using React + Flux then providing an application " + "will increase performance of Recess and is highly advised.");

            this._appWarn = false;
        }

        if (_.isUndefined(component)) {
            console.error("Error: No component has been specified.");
            return this;
        }

        if (_.isString(component)) {
            return this._componentOptions[component];
        }

        if (_.isObject(component)) {
            name = component._reactInternalInstance && component._reactInternalInstance._currentElement.type.displayName;

            if (!this._component[name]) {
                this._component[name] = {};
            }

            if (!this._componentOptions[name]) {
                this._componentOptions[name] = {};
            }

            if (_.isUndefined(options)) {
                return this._componentOptions[name];
            }

            this._component[name] = component;
            _.assign(this._componentOptions[name], options);
        }

        return this;
    },

    componentStyles: function componentStyles(component, styles) {
        var name;

        if (!this._app && this._appWarn) {
            console.warn("Warning: You haven't created an application, which means each component will be managed independently. This is unavoidable if " + "you are using a different library as your application base, however if you are using React + Flux then providing an application " + "will increase performance of Recess and is highly advised.");

            this._appWarn = false;
        }

        if (_.isUndefined(component)) {
            console.error("Error: No component has been specified.");
            return this;
        }

        if (_.isString(component)) {
            return this._componentStyles[component];
        }

        if (_.isObject(component)) {
            name = component._reactInternalInstance && component._reactInternalInstance._currentElement.type.displayName;

            if (!this._component[name]) {
                this._component[name] = {};
            }

            if (!this._componentStyles[name]) {
                this._componentStyles[name] = {};
            }

            if (_.isUndefined(styles)) {
                return this._componentStyles[name];
            }

            this._component[name] = component;
            _.assign(this._componentStyles[name], styles);
        }

        return this;
    },

    element: function element(Element) {
        var Component = React.createClass({
            displayName: "Component",

            componentWillReceiveProps: function componentWillReceiveProps(newProps) {
                this.setState({
                    options: newProps.options || {},
                    style: newProps.style
                });
            },

            getInitialState: function getInitialState() {
                return {
                    options: this.props.options || {},
                    style: this.props.style
                };
            },

            onBlur: function onBlur() {
                this.setState({
                    style: this.props.style
                });

                if (this.props.onBlur) {
                    this.props.onBlur.call();
                }
            },

            onDrag: function onDrag() {
                this.setState({
                    style: _.assign({}, this.props.style, this.state.options.drag)
                });

                if (this.props.onDrag) {
                    this.props.onDrag.call();
                }
            },

            onDragEnter: function onDragEnter() {
                this.setState({
                    style: _.assign({}, this.props.style, this.state.options.dragEnter)
                });

                if (this.props.onDragEnter) {
                    this.props.onDragEnter.call();
                }
            },

            onDragLeave: function onDragLeave() {
                this.setState({
                    style: this.props.style
                });

                if (this.props.onDragLeave) {
                    this.props.onDragLeave.call();
                }
            },

            onFocus: function onFocus() {
                this.setState({
                    style: _.assign({}, this.props.style, this.state.options.focus)
                });

                if (this.props.onFocus) {
                    this.props.onFocus.call();
                }
            },

            onMouseDown: function onMouseDown() {
                this.setState({
                    style: _.assign({}, this.props.style, this.state.options.active)
                });

                if (this.props.onMouseDown) {
                    this.props.onMouseDown.call();
                }
            },

            onMouseEnter: function onMouseEnter() {
                this.setState({
                    style: _.assign({}, this.props.style, this.state.options.hover)
                });

                if (this.props.onMouseEnter) {
                    this.props.onMouseEnter.call();
                }
            },

            onMouseLeave: function onMouseLeave() {
                this.setState({
                    style: this.props.style
                });

                if (this.props.onMouseLeave) {
                    this.props.onMouseLeave.call();
                }
            },

            onMouseUp: function onMouseUp() {
                this.setState({
                    style: _.assign({}, this.props.style, this.state.options.hover)
                });

                if (this.props.onMouseUp) {
                    this.props.onMouseUp.call();
                }
            },

            render: function render() {
                var _props = this.props;
                var children = _props.children;
                var onDragEnter = _props.onDragEnter;
                var onDragExit = _props.onDragExit;
                var onDragLeave = _props.onDragLeave;
                var onDragOver = _props.onDragOver;
                var onLoad = _props.onLoad;
                var onMouseDown = _props.onMouseDown;
                var onMouseEnter = _props.onMouseEnter;
                var onMouseLeave = _props.onMouseLeave;
                var onMouseUp = _props.onMouseUp;
                var onTouchEnd = _props.onTouchEnd;
                var onTouchStart = _props.onTouchStart;
                var options = _props.options;
                var style = _props.style;
                var otherProps = _objectWithoutProperties(_props, ["children", "onDragEnter", "onDragExit", "onDragLeave", "onDragOver", "onLoad", "onMouseDown", "onMouseEnter", "onMouseLeave", "onMouseUp", "onTouchEnd", "onTouchStart", "options", "style"]);
                var style = this.state.style;

                if (this.props.disabled) {
                    style = this.props.options.disabled;
                }

                if (this.props.readonly) {
                    style = this.props.options.readonly;
                }

                return React.createElement(
                    Element.type,
                    _extends({
                        onBlur: this.onBlur,
                        onDrag: this.onDrag,
                        onDragEnter: this.onDragEnter,
                        onDragLeave: this.onDragLeave,
                        onFocus: this.onFocus,
                        onLoad: this.onLoad,
                        onMouseDown: this.onMouseDown,
                        onMouseEnter: this.onMouseEnter,
                        onMouseLeave: this.onMouseLeave,
                        onMouseUp: this.onMouseUp,
                        onTouchEnd: this.onTouchEnd,
                        onTouchStart: this.onTouchStart,
                        style: style
                    }, otherProps),
                    children
                );
            },

            onTouchEnd: function onTouchEnd() {
                this.setState({
                    style: _.assign({}, this.props.style, this.state.options.active)
                });

                if (this.props.onTouchEnd) {
                    this.props.onTouchEnd.call();
                }
            },

            onTouchStart: function onTouchStart() {
                this.setState({
                    style: _.assign({}, this.props.style, this.state.options.active)
                });

                if (this.props.onTouchStart) {
                    this.props.onTouchStart.call();
                }
            }
        });

        return Component;
    },

    extend: function extend(styles) {
        _.forOwn(styles, (function (value, key) {
            if (!this.styles[key]) {
                this.styles[key] = {};
            }

            if (_.isFunction(value)) {
                this.styles[key] = value;
            } else {
                assign(this.styles[key], value);
            }
        }).bind(this));

        return this;
    },

    onResize: function onResize() {
        if (sizes.sizeName() !== this.size) {
            this.size = sizes.sizeName();
            this.render();
        }
    },

    prefix: normalize,

    render: function render() {
        setResponsive.call(this, this.size);

        if (this._app) {
            this._app.forceUpdate();
        } else {
            _.forOwn(this._components, function (component) {
                component.forceUpdate();
            });
        }

        return this;
    },

    stylesheet: function stylesheet(id, styles) {
        if (_.isUndefined(id)) {
            console.error("Error: generated stylesheets need to be given an id.");
            return this;
        }

        if (document.getElementById(id) !== null) {
            return this;
        }

        var style = document.createElement("style");

        style.type = "text/css";
        style.id = id;

        if (_.isString(styles)) {
            style.textContent = new CleanCSS().minify(styles).styles;
        } else if (_.isObject(styles)) {
            var str = "";

            _.forOwn(styles, function (style, key) {
                str += key + "{";

                style = normalize(style);

                _.forOwn(style, function (value, property) {
                    if (property.charAt(0).toUpperCase() === property.charAt(0)) {
                        str += "-";
                    }

                    str += _.kebabCase(property) + ":" + value + ";";
                });

                str += "}";
            });

            style.textContent = new CleanCSS().minify(str).styles;
        } else {
            console.error("Error: You either need to provide an object or a string when creating a new stylesheet");
            return this;
        }

        document.head.appendChild(style);

        return this;
    }
});

module.exports = Recess;