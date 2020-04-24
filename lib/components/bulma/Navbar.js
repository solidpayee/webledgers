var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from '../../../web_modules/react.js';
export default NavbarSolidLogin;

function NavbarAbout(_ref) {
  let { sourceCode } = _ref,
      props = _objectWithoutProperties(_ref, ['sourceCode']);

  return React.createElement(
    'div',
    { className: 'navbar-item has-dropdown is-hoverable' },
    React.createElement(
      Navbar.List,
      { title: 'About' },
      React.createElement(
        Navbar.Item,
        { href: 'index.html' },
        'Index'
      ),
      React.createElement('hr', null),
      React.createElement(
        Navbar.Item,
        { href: sourceCode },
        'Source'
      )
    )
  );
}

class NavbarLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false, webId: null };
  }

  componentDidMount() {
    var _this = this;

    return _asyncToGenerator(function* () {
      console.log('mounted');

      const session = yield solid.auth.currentSession();
      if (session) {
        _this.setState({ loggedIn: true, webId: session.webId });
        console.log(`Logged in as ${session.webId}`);
      }
    })();
  }

  login(idp) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      console.log('login');

      idp = idp || 'https://solid.community';
      const session = yield solid.auth.currentSession();
      console.log('session', session);
      if (!session) {
        yield solid.auth.login(idp);
      } else {
        _this2.setState({ loggedIn: true });
        console.log(`Logged in as ${session.webId}`);
      }
    })();
  }

  render() {
    const _props = this.props,
          { sourceCode } = _props,
          props = _objectWithoutProperties(_props, ['sourceCode']);
    if (this.state.loggedIn) {
      return React.createElement(
        'div',
        { className: 'navbar-item has-dropdown is-hoverable' },
        React.createElement(
          Navbar.List,
          { title: 'Logged In' },
          React.createElement(
            'a',
            {
              className: 'navbar-item button navbar is-primary',
              onClick: () => {
                localStorage.clear();
                location.reload();
              }
            },
            'Logout'
          ),
          React.createElement('hr', null)
        )
      );
    } else {
      return React.createElement(
        'div',
        { className: 'navbar-item has-dropdown is-hoverable' },
        React.createElement(
          Navbar.List,
          { title: 'Sign In' },
          React.createElement(
            'a',
            {
              className: 'navbar-item button navbar is-primary',
              onClick: () => {
                this.login();
              },
              href: '#'
            },
            'Login'
          ),
          React.createElement('hr', null),
          React.createElement(
            'a',
            {
              className: 'navbar-item button navbar is-info',
              target: '_blank',
              href: 'https://solid.community/'
            },
            'Sign Up'
          )
        )
      );
    }
  }
}

function NavbarItem(_ref2) {
  let { href } = _ref2,
      props = _objectWithoutProperties(_ref2, ['href']);

  return React.createElement(
    'a',
    _extends({ href: href }, props, { className: 'navbar-item' }),
    props.children
  );
}

function NavbarLogo(_ref3) {
  let { href = '#', src, alt, width, height } = _ref3,
      props = _objectWithoutProperties(_ref3, ['href', 'src', 'alt', 'width', 'height']);

  return React.createElement(
    'a',
    { href: href, className: 'navbar-item' },
    React.createElement('img', { src: src, alt: alt, width: width, height: height })
  );
}

function NavbarList(_ref4) {
  let { title } = _ref4,
      props = _objectWithoutProperties(_ref4, ['title']);

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      'a',
      { className: 'navbar-link' },
      title
    ),
    React.createElement(
      'div',
      { className: 'navbar-dropdown' },
      props.children
    )
  );
}

class NavbarBurger extends React.Component {
  constructor(props) {
    super(props);
  }

  toggleNav() {
    var nav = document.querySelector('.navbar-menu');
    if (nav.className === 'navbar-menu') {
      nav.className = 'navbar-menu is-active';
    } else {
      nav.className = 'navbar-menu';
    }
  }

  render() {
    return React.createElement(
      React.Fragment,
      null,
      React.createElement(
        'a',
        {
          role: 'button',
          className: 'navbar-burger burger',
          'aria-label': 'menu',
          'aria-expanded': 'false',
          'data-target': 'navbarBasicExample',
          onClick: this.toggleNav
        },
        React.createElement('span', { 'aria-hidden': 'true' }),
        React.createElement('span', { 'aria-hidden': 'true' }),
        React.createElement('span', { 'aria-hidden': 'true' })
      )
    );
  }
}

function NavbarBrand(props) {
  return React.createElement(
    'div',
    { className: 'navbar-brand' },
    props.children
  );
}

function NavbarContainer(_ref5) {
  let { position } = _ref5,
      props = _objectWithoutProperties(_ref5, ['position']);

  return React.createElement(
    'div',
    { className: 'navbar-' + position },
    props.children
  );
}

function NavbarMenu(_ref6) {
  let props = _objectWithoutProperties(_ref6, []);

  return React.createElement(
    'div',
    { className: 'navbar-menu' },
    props.children
  );
}

function Navbar(_ref7) {
  let { title, className } = _ref7,
      props = _objectWithoutProperties(_ref7, ['title', 'className']);

  return React.createElement(
    'nav',
    {
      className: 'navbar ' + className,
      role: 'navigation',
      'aria-label': 'main navigation'
    },
    props.children
  );
}

function NavbarExample(_ref8) {
  let { title, className } = _ref8,
      props = _objectWithoutProperties(_ref8, ['title', 'className']);

  return React.createElement(
    Navbar,
    { className: className },
    React.createElement(
      Navbar.Brand,
      null,
      React.createElement(
        Navbar.Item,
        { href: '#' },
        title
      ),
      React.createElement(Navbar.Burger, null)
    ),
    React.createElement(
      Navbar.Menu,
      null,
      React.createElement(
        Navbar.Container,
        { position: 'start' },
        React.createElement(Navbar.About, null)
      ),
      props.children
    )
  );
}

function NavbarSolid(_ref9) {
  let { title, className, sourceCode } = _ref9,
      props = _objectWithoutProperties(_ref9, ['title', 'className', 'sourceCode']);

  return React.createElement(
    Navbar,
    { className: className },
    React.createElement(
      Navbar.Brand,
      null,
      React.createElement(Navbar.Logo, {
        href: '#',
        src: 'https://play-grounds.github.io/react/play/image/solid.svg',
        width: '30',
        height: '30',
        alt: 'Logo'
      }),
      React.createElement(
        Navbar.Item,
        { href: '#' },
        title
      ),
      React.createElement(Navbar.Burger, null)
    ),
    React.createElement(
      Navbar.Menu,
      null,
      React.createElement(
        Navbar.Container,
        { position: 'start' },
        React.createElement(Navbar.About, { sourceCode: sourceCode })
      ),
      props.children
    )
  );
}

function NavbarSolidLogin(_ref10) {
  let { title, className, sourceCode } = _ref10,
      props = _objectWithoutProperties(_ref10, ['title', 'className', 'sourceCode']);

  return React.createElement(
    Navbar,
    { className: className },
    React.createElement(
      Navbar.Brand,
      null,
      React.createElement(Navbar.Logo, {
        href: '#',
        src: 'https://play-grounds.github.io/react/play/image/solid.svg',
        width: '30',
        height: '30',
        alt: 'Logo'
      }),
      React.createElement(
        Navbar.Item,
        { href: '#' },
        title
      ),
      React.createElement(Navbar.Burger, null)
    ),
    React.createElement(
      Navbar.Menu,
      null,
      React.createElement(
        Navbar.Container,
        { position: 'start' },
        React.createElement(Navbar.About, { sourceCode: sourceCode })
      ),
      props.children,
      React.createElement(
        Navbar.Container,
        { position: 'end' },
        React.createElement(Navbar.Login, { sourceCode: sourceCode })
      )
    )
  );
}

Navbar.About = NavbarAbout;
Navbar.Login = NavbarLogin;
Navbar.List = NavbarList;
Navbar.Item = NavbarItem;
Navbar.Logo = NavbarLogo;
Navbar.Burger = NavbarBurger;
Navbar.Brand = NavbarBrand;
Navbar.Menu = NavbarMenu;
Navbar.Container = NavbarContainer;

Navbar.Example = NavbarExample;