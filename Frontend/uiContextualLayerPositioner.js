__d('ContextualLayer', ['Arbiter', 'ARIA', 'ContextualThing', 'CSS', 'DataStore', 'DOM', 'Event', 'Layer', 'LayerHideOnTransition', 'Locale', 'Parent', 'Rect', 'Scroll', 'Style', 'SVGChecker', 'Vector', 'arrayContains', 'containsNode', 'emptyFunction', 'getOwnObjectValues', 'getOffsetParent', 'getOverlayZIndex', 'isElementNode', 'removeFromArray', 'throttle'], (function a(b, c, d, e, f, g) {
    var h, i;
    if (c.__markCompiled) c.__markCompiled();

    function j(p) {
        return p.getPosition() === 'left' || p.isVertical() && p.getAlignment() === 'right';
    }
    h = babelHelpers.inherits(k, c('Layer'));
    i = h && h.prototype;
    k.prototype._configure = function(p, q) {
        'use strict';
        i._configure.call(this, p, q);
        if (p.shouldSetARIAProperties === false) this._shouldSetARIAProperties = p.shouldSetARIAProperties;
        if (p.context) {
            this.setContext(p.context);
        } else if (p.contextID) {
            this._setContextID(p.contextID);
        } else if (p.contextSelector) this._setContextSelector(p.contextSelector);
        this.setPosition(p.position);
        this.setAlignment(p.alignment);
        this.setOffsetX(p.offsetX);
        this.setOffsetY(p.offsetY);
        this.setArrowDimensions(p.arrowDimensions);
        this._content = q;
    };
    k.prototype._getDefaultBehaviors = function() {
        'use strict';
        var p = k.getDefaultBehaviorsAsObject();
        return i._getDefaultBehaviors.call(this).concat(c('getOwnObjectValues')(p));
    };
    k.prototype._buildWrapper = function(p, q) {
        'use strict';
        this._contentWrapper = c('DOM').create('div', {
            className: 'uiContextualLayer'
        }, q);
        return c('DOM').create('div', {
            className: 'uiContextualLayerPositioner'
        }, this._contentWrapper);
    };
    k.prototype.getInsertParent = function() {
        'use strict';
        var p = this._insertParent;
        if (!p) {
            var q = this.getContext();
            if (q) p = c('Parent').byClass(q, 'uiContextualLayerParent');
        }
        return p || i.getInsertParent.call(this);
    };
    k.prototype.setContent = function(p) {
        'use strict';
        this._content = p;
        c('DOM').setContent(this._contentWrapper, this._content);
        this._shown && this.updatePosition();
        return this;
    };
    k.prototype.setContext = function(p) {
        'use strict';
        return this.setContextWithBounds(p, null);
    };
    k.prototype.setContextWithBounds = function(p, q) {
        'use strict';
        if (this._contextNode === p && q && this._contextBounds && q.isEqualTo(this._contextBounds)) return this;
        this._contextNode = p;
        var r = q && this._contextBounds && q.t === this._contextBounds.t && q.r === this._contextBounds.r && q.b === this._contextBounds.b && q.l === this._contextBounds.l;
        if (r) return this;
        this._contextBounds = q || null;
        this._contextSelector = this._contextScrollParent = null;
        if (this._shown) {
            c('ContextualThing').register(this.getRoot(), this._contextNode);
            this.updatePosition();
        }
        this._setParentSubscription();
        this.setARIAProperties();
        return this;
    };
    k.prototype.shouldSetARIAProperties = function(p) {
        'use strict';
        this._shouldSetARIAProperties = p;
        return this;
    };
    k.prototype.setARIAProperties = function() {
        'use strict';
        if (this._shouldSetARIAProperties) c('ARIA').setPopup(this.getCausalElement(), this.getRoot());
        return this;
    };
    k.prototype._setContextID = function(p) {
        'use strict';
        this._contextSelector = '#' + p;
        this._contextNode = null;
    };
    k.prototype._setContextSelector = function(p) {
        'use strict';
        this._contextSelector = p;
        this._contextNode = null;
    };
    k.prototype.getCausalElement = function() {
        'use strict';
        return i.getCausalElement.call(this) || this.getContext();
    };
    k.prototype._setParentSubscription = function() {
        'use strict';
        var p = this.getContext(),
            q = null;
        while (p !== null) {
            q = c('DataStore').get(p, 'layer');
            if (q) break;
            p = p.parentNode;
        }
        if (q === this._parentLayer) return;
        if (this._parentLayer && this._parentSubscription) {
            this._parentLayer.unsubscribe(this._parentSubscription);
            this._parentSubscription = null;
        }
        if (q) this._parentSubscription = q.subscribe('hide', this.hide.bind(this));
        this._parentLayer = q;
    };
    k.prototype.setPosition = function(p) {
        'use strict';
        if (this.getOrientation().setDefaultPosition(p)) this._shown && this.updatePosition();
        return this;
    };
    k.prototype.setAlignment = function(p) {
        'use strict';
        if (this.getOrientation().setDefaultAlignment(p)) this._shown && this.updatePosition();
        return this;
    };
    k.prototype.setOffsetX = function(p) {
        'use strict';
        if (this.getOrientation().setDefaultOffsetX(p)) this._shown && this.updatePosition();
        return this;
    };
    k.prototype.setArrowDimensions = function(p) {
        'use strict';
        if (p && this.getOrientation().setArrowOffset(p.offset)) this._shown && this.updatePosition();
        return this;
    };
    k.prototype.setOffsetY = function(p) {
        'use strict';
        if (this.getOrientation().setDefaultOffsetY(p)) this._shown && this.updatePosition();
        return this;
    };
    k.prototype.getPosition = function() {
        'use strict';
        return this.getOrientation().getPosition();
    };
    k.prototype.getOrientation = function() {
        'use strict';
        if (!this._orientation) this._orientation = new o();
        return this._orientation;
    };
    k.prototype.getContentRoot = function() {
        'use strict';
        return this._contentWrapper;
    };
    k.prototype.getContent = function() {
        'use strict';
        return this._content;
    };
    k.prototype.getContext = function() {
        'use strict';
        if (!this._contextNode) this._contextNode = c('DOM').find(document, this._contextSelector);
        return this._contextNode;
    };
    k.prototype.getContextBounds = function(p) {
        'use strict';
        if (this._contextBounds) return this._contextBounds.convertTo(p);
        var q = this.getContext();
        return c('Rect').newFromVectors(c('Vector').getElementPosition(q, p), c('Vector').getElementDimensions(q));
    };
    k.prototype.getContextScrollParent = function() {
        'use strict';
        if (!this._contextScrollParent) {
            this._contextScrollParent = c('Style').getScrollParent(this.getContext());
        } else if (c('isElementNode')(this._contextScrollParent) && !c('containsNode')(document.documentElement, this._contextScrollParent)) this._contextScrollParent = c('Style').getScrollParent(this.getContext());
        return this._contextScrollParent;
    };
    k.prototype.setInsertParent = function(p) {
        'use strict';
        this._insertScrollParent = null;
        return i.setInsertParent.call(this, p);
    };
    k.prototype.getInsertScrollParent = function() {
        'use strict';
        if (!this._insertScrollParent) this._insertScrollParent = c('Style').getScrollParent(this.getInsertParent());
        return this._insertScrollParent;
    };
    k.prototype.show = function() {
        'use strict';
        if (this._shown) return this;
        i.show.call(this);
        if (this._shown) {
            c('ContextualThing').register(this.getRoot(), this.getContext());
            l.push(this);
            this._resizeListener = this._resizeListener || c('Event').listen(window, 'resize', c('throttle')(function() {
                if (this._shown) this.updatePosition();
            }.bind(this)));
        }
        return this;
    };
    k.prototype.finishHide = function() {
        'use strict';
        c('removeFromArray')(l, this);
        this._resizeListener && this._resizeListener.remove();
        this._resizeListener = null;
        this._insertScrollParent = null;
        return i.finishHide.call(this);
    };
    k.prototype.isFixed = function() {
        'use strict';
        return (c('Style').isFixed(this.getContext()) && !c('Style').isFixed(this.getInsertParent()));
    };
    k.prototype.updatePosition = function() {
        'use strict';
        var p = this.getContext();
        if (!p) return false;
        var q = this.isFixed();
        if (!q && !(p.offsetParent || c('SVGChecker').isSVG(p) && c('SVGChecker').isDisplayed(p))) return false;
        var r = this.getRoot();
        c('Style').set(r, 'width', c('Vector').getViewportDimensions().x + 'px');
        var s = this.getOrientation();
        this.inform('adjust', s.reset());
        if (!s.isValid()) return false;
        this._updateWrapperPosition(s);
        this._updateWrapperClass(s);
        c('CSS').conditionClass(r, 'uiContextualLayerPositionerFixed', q);
        var t, u, v = q ? 'viewport' : 'document',
            w = q ? document.documentElement : c('getOffsetParent')(r);
        if (w === document.documentElement) {
            t = new(c('Vector'))(0, 0);
            u = document.documentElement.clientWidth;
        } else if (!r.offsetParent) {
            return false;
        } else {
            t = c('Vector').getElementPosition(w, v);
            u = w.offsetWidth;
            if (w !== document.body) t = t.sub(new(c('Vector'))(c('Scroll').getLeft(w), c('Scroll').getTop(w)));
        }
        var x = this.getContextBounds(v),
            y = x.l - t.x,
            z = x.t - t.y,
            aa = x.h(),
            ba = x.w(),
            ca = c('Locale').isRTL();
        if (s.getPosition() === 'below') z += aa;
        if ((s.getPosition() === 'right' || s.isVertical() && s.getAlignment() === 'right') != ca) y += ba;
        var da = s.getOffsetX();
        if (s.isVertical() && s.getAlignment() === 'center') da += (ba - this.getContentRoot().offsetWidth) / 2;
        if (ca) da *= -1;
        var ea = 'left',
            fa = Math.floor(y + da);
        if (j(s) !== ca) {
            ea = 'right';
            fa = u - fa;
        }
        c('Style').set(r, ea, fa + 'px');
        c('Style').set(r, ea === 'left' ? 'right' : 'left', '');
        var ga = this.getInsertScrollParent(),
            ha;
        if (ga !== window) {
            ha = ga.clientWidth;
        } else ha = document.documentElement.clientWidth;
        var ia = c('Vector').getElementPosition(r).x;
        if (ea === 'left' && ha - ia > 0) {
            c('Style').set(r, 'width', ha - ia + 'px');
        } else if (ea === 'right' && ia + r.offsetWidth > 0) {
            c('Style').set(r, 'width', ia + r.offsetWidth + 'px');
        } else c('Style').set(r, 'width', '');
        c('Style').set(r, 'top', z + s.getOffsetY() + 'px');
        var ja = c('getOverlayZIndex')(p, this.getInsertParent());
        c('Style').set(r, 'z-index', ja > 200 ? ja : '');
        this.inform('reposition', s);
        return true;
    };
    k.prototype._updateWrapperPosition = function(p) {
        'use strict';
        var q = p.getPosition() === 'above';
        c('Style').set(this._contentWrapper, 'bottom', q ? '0' : null);
        var r = c('Locale').isRTL() ? 'left' : 'right',
            s = j(p);
        c('Style').set(this._contentWrapper, r, s ? '0' : null);
    };
    k.prototype._updateWrapperClass = function(p) {
        'use strict';
        var q = p.getClassName();
        if (q === this._orientationClass) return;
        if (this._orientationClass) c('CSS').removeClass(this._contentWrapper, this._orientationClass);
        this._orientationClass = q;
        c('CSS').addClass(this._contentWrapper, q);
    };
    k.prototype.simulateOrientation = function(p, q) {
        'use strict';
        var r = p.getClassName();
        if (r === this._orientationClass) {
            return q();
        } else {
            if (this._orientationClass) c('CSS').removeClass(this._contentWrapper, this._orientationClass);
            c('CSS').addClass(this._contentWrapper, r);
            var s = q();
            c('CSS').removeClass(this._contentWrapper, r);
            if (this._orientationClass) c('CSS').addClass(this._contentWrapper, this._orientationClass);
            return s;
        }
    };
    k.prototype.destroy = function() {
        'use strict';
        i.destroy.call(this);
        this._contentWrapper = null;
        this._content = null;
        return this;
    };
    k.prototype.getArrowDimensions = function() {
        'use strict';
        return this._config.arrowDimensions || {
            offset: 0,
            length: 0
        };
    };
    k.getDefaultBehaviorsAsObject = function() {
        'use strict';
        return {
            LayerHideOnTransition: c('LayerHideOnTransition')
        };
    };

    function k() {
        'use strict';
        h.apply(this, arguments);
    }
    var l = [];
    c('Arbiter').subscribe('reflow', function() {
        l.forEach(function(p) {
            if (p.updatePosition() === false) p.hide();
        });
    });
    Object.assign(k.prototype, {
        _contentWrapper: null,
        _content: null,
        _contextNode: null,
        _contextBounds: null,
        _contextSelector: null,
        _parentLayer: null,
        _parentSubscription: null,
        _orientation: null,
        _orientationClass: null,
        _shouldSetARIAProperties: true
    });
    var m = c('emptyFunction').thatReturnsArgument,
        n = c('emptyFunction').thatReturnsArgument;

    function o() {
        'use strict';
        this._default = {
            _position: 'above',
            _alignment: 'left',
            _offsetX: 0,
            _offsetY: 0,
            _valid: true,
            _preferMoreContentShownRect: false
        };
        this.reset();
    }
    o.prototype.setPosition = function(p) {
        'use strict';
        this._position = m(p);
        return this;
    };
    o.prototype.setAlignment = function(p) {
        'use strict';
        this._alignment = n(p);
        return this;
    };
    o.prototype.getOppositePosition = function() {
        'use strict';
        return o.OPPOSITE[this.getPosition()];
    };
    o.prototype.invalidate = function() {
        'use strict';
        this._valid = false;
        return this;
    };
    o.prototype.getPosition = function() {
        'use strict';
        return this._position || 'above';
    };
    o.prototype.getAlignment = function() {
        'use strict';
        return this._alignment || 'left';
    };
    o.prototype.getOffsetX = function() {
        'use strict';
        var p = this._offsetX || 0;
        if (!this.isVertical()) {
            if (this._default._position !== this._position) p *= -1;
        } else if (this._default._alignment !== this._alignment) p *= -1;
        return p;
    };
    o.prototype.getOffsetY = function() {
        'use strict';
        var p = this._offsetY || 0;
        if (this.isVertical() && this._default._position !== this._position) p *= -1;
        return p;
    };
    o.prototype.getClassName = function() {
        'use strict';
        var p = this.getAlignment(),
            q = this.getPosition();
        if (q === 'below') {
            if (p === 'left') {
                return 'uiContextualLayerBelowLeft';
            } else if (p === 'right') {
                return 'uiContextualLayerBelowRight';
            } else return 'uiContextualLayerBelowCenter';
        } else if (q === 'above') {
            if (p === 'left') {
                return 'uiContextualLayerAboveLeft';
            } else if (p === 'right') {
                return 'uiContextualLayerAboveRight';
            } else return 'uiContextualLayerAboveCenter';
        } else if (q === 'left') {
            return 'uiContextualLayerLeft';
        } else return 'uiContextualLayerRight';
    };
    o.prototype.isValid = function() {
        'use strict';
        return this._valid;
    };
    o.prototype.isVertical = function() {
        'use strict';
        return this.getPosition() === 'above' || this.getPosition() === 'below';
    };
    o.prototype.reset = function() {
        'use strict';
        Object.assign(this, this._default);
        return this;
    };
    o.prototype.setDefaultPosition = function(p) {
        'use strict';
        var q = this._default._position;
        this._default._position = m(p);
        return q !== p;
    };
    o.prototype.setDefaultAlignment = function(p) {
        'use strict';
        var q = this._default._alignment;
        this._default._alignment = n(p);
        return q !== p;
    };
    o.prototype.setDefaultOffsetX = function(p) {
        'use strict';
        var q = this._default._offsetX;
        this._default._offsetX = p;
        return q !== p;
    };
    o.prototype.setArrowOffset = function(p) {
        'use strict';
        var q = this._default._arrowOffset;
        this._default._arrowOffset = p;
        return q !== p;
    };
    o.prototype.getArrowOffset = function() {
        'use strict';
        return this._default._arrowOffset || 0;
    };
    o.prototype.setDefaultOffsetY = function(p) {
        'use strict';
        var q = this._default._offsetY;
        this._default._offsetY = p;
        return q !== p;
    };
    o.prototype.setPreferMoreContentShownRect = function(p) {
        'use strict';
        var q = this._default._preferMoreContentShownRect;
        this._default._preferMoreContentShownRect = p;
        return q !== p;
    };
    o.prototype.getPreferMoreContentShownRect = function() {
        'use strict';
        return this._default._preferMoreContentShownRect;
    };
    o.OPPOSITE = {
        above: 'below',
        below: 'above',
        left: 'right',
        right: 'left'
    };
    f.exports = k;
}), null);