__d('UFIStickerButton.react', ['cx', 'fbt', 'Arbiter', 'Bootloader', 'Link.react', 'React', 'StickerInterfaces', 'getObjectValues'], (function a(b, c, d, e, f, g, h, i) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();
    var j = c('React').PropTypes,
        k = c('React').createClass({
            displayName: 'UFIStickerButton',
            _clickGuard: false,
            _updateListener: null,
            propTypes: {
                onStickerFlyoutShow: j.func,
                onStickerSelected: j.func.isRequired,
                onEmoticonSelected: j.func,
                showTooltip: j.bool,
                stickerInterface: j.oneOf(c('getObjectValues')(c('StickerInterfaces'))),
                tabIndex: j.number
            },
            getDefaultProps: function l() {
                return {
                    showTooltip: true,
                    stickerInterface: c('StickerInterfaces').COMMENTS
                };
            },
            getInitialState: function l() {
                return {
                    renderFlyout: null,
                    flyoutShown: false
                };
            },
            componentDidMount: function l() {
                this._updateListener = c('Arbiter').subscribe('page_transition', function() {
                    return this._hideFlyout();
                }.bind(this));
            },
            componentWillUnmount: function l() {
                this._updateListener && this._updateListener.unsubscribe();
            },
            render: function l() {
                var m = i._("\u52a0\u4e00\u5f35\u8cbc\u5716");
                return (c('React').createElement(c('Link.react'), {
                    className: "_r1a UFICommentStickerButton",
                    'data-hover': 'tooltip',
                    'data-tooltip-alignh': 'center',
                    'data-tooltip-content': this.props.showTooltip ? m : null,
                    'aria-label': m,
                    onClick: this._onLinkClicked,
                    tabIndex: this.props.tabIndex,
                    onMouseDown: this._prepareForClick
                }, c('React').createElement('div', {
                    ref: 'icon',
                    tabIndex: this.props.tabIndex || 0,
                    className: 'UFICommentStickerIcon'
                }), this.props.children, this.state.renderFlyout ? this.state.renderFlyout() : null));
            },
            _hideFlyout: function l() {
                this.setState({
                    flyoutShown: false
                });
            },
            _prepareForClick: function l() {
                this._clickGuard = this.state.flyoutShown;
            },
            _onLinkClicked: function l() {
                if (this.state.renderFlyout !== null) {
                    if (!this._clickGuard) {
                        this.props.onStickerFlyoutShow && this.props.onStickerFlyoutShow();
                        this.setState({
                            flyoutShown: true
                        });
                    }
                    return;
                }
                c('Bootloader').loadModules(["XUIContextualDialog.react", "StickersFlyout.react", "ContextualLayerAutoFlip"], function(m, n, o) {
                    this.setState({
                        flyoutShown: true,
                        renderFlyout: function() {
                            return (c('React').createElement(m, {
                                alignment: 'right',
                                behaviors: {
                                    flip: o
                                },
                                className: "_5e-r",
                                contextRef: function() {
                                    return this.refs.icon;
                                }.bind(this),
                                onBlur: this._hideFlyout,
                                onToggle: function(p) {
                                    if (!p && this.state.flyoutShown) this._hideFlyout();
                                }.bind(this),
                                position: 'above',
                                shown: this.state.flyoutShown,
                                hasActionableContext: true,
                                width: 278
                            }, c('React').createElement('div', null, c('React').createElement(n, {
                                onEscKeyDown: this._hideFlyout,
                                onStickerSelect: this._onStickerSelected,
                                onEmoticonSelect: this._onEmoticonSelected,
                                stickerInterface: this.props.stickerInterface,
                                shown: this.state.flyoutShown
                            }))));
                        }.bind(this)
                    });
                    this.props.onStickerFlyoutShow && this.props.onStickerFlyoutShow();
                }.bind(this), 'UFIStickerButton.react');
            },
            _onStickerSelected: function l(m, event) {
                this.props.onStickerSelected(m, event);
                this._hideFlyout();
            },
            _onEmoticonSelected: function l(m) {
                this.props.onEmoticonSelected && this.props.onEmoticonSelected(m);
                this._hideFlyout();
            }
        });
    f.exports = k;
}), null);