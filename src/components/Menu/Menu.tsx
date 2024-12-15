import type { FunctionalComponent } from 'preact';
import { useState, useCallback, useRef } from 'preact/hooks';

import { NavBar, NavMenu, NavMenuBar, MobileNavMenu, NavMenuTitle, NavMenuItem } from './styled';

import { translations } from './translations';
import MenuItems from './MenuItems';

import Widgets from '@icons/Widgets';
import ChangeHistory from '@icons/ChangeHistory';
import Burger from '@icons/Burger';

import Button from '@components/Button';
import RouteLink from '@components/RouteLink';
import Portal from '@components/Portal';
import Flex from '@components/Flex';
import Container from '@components/Container';

import { Backdrop } from '@styles/components';
import type { Langs } from '@typings/Langs';

const menu: {
    url: string,
    title: 'ENGINE' | 'RHYTHMICS',
    icon: React.ReactNode
}[] = [
  {
    url: 'images-engine',
    title: 'ENGINE',
    icon: <Widgets />
  },
  {
    url: 'rhythmic',
    title: 'RHYTHMICS',
    icon: <ChangeHistory />
  }
];

let initialY = 0;
let deltaY = 0;

interface MenuProps {
    lang: Langs
    items: React.ReactNode[]
}

const Menu: FunctionalComponent<MenuProps> = ({ items, lang = 'ru' }) => {
    
  const [ isMenuHidden, setMenuVisibility ] = useState(true);
    
  const mobileNavMenu = useRef<HTMLUListElement>(null);

  const toggleMenu = useCallback(() => {
    const isHidden = !isMenuHidden;
    if (isHidden) {
      document.body.classList.remove('fixed');
    } else {
      document.body.classList.add('fixed');
    } 
    setMenuVisibility(isHidden);
  }, [isMenuHidden]);

  const onTouchToggle: React.TouchEventHandler<HTMLUListElement> = useCallback(
    (e) => {
      if (e.type === 'touchstart') {
        initialY = e.touches[0].clientY;
      }

      if (e.type === 'touchend' && deltaY > 0 && !isMenuHidden) {
        deltaY = 0;
        toggleMenu();
      }
    },
    [isMenuHidden, toggleMenu]
  );

  const onTouchMove: React.TouchEventHandler<HTMLUListElement> = useCallback(
    (e) => {
      deltaY = e.touches[0].clientY - initialY;
      if (mobileNavMenu.current) {
        mobileNavMenu.current.style.transform = `translateY(${
          deltaY < 0 ? 0 : deltaY
        }px)`;

        if (
          deltaY > mobileNavMenu.current.offsetHeight * 0.85 &&
                    !isMenuHidden
        ) {
          deltaY = 0;
          toggleMenu();
        }
      }
    },
    [isMenuHidden, toggleMenu]
  );

  return (
    <NavBar id="nav">
      <NavMenuBar>
        <Button _rounded _flat _transparent onClick={toggleMenu}>
          <Burger />
        </Button>
        {!isMenuHidden ? (
          <Portal id="portal-menu">
            <Backdrop>
              <MobileNavMenu
                ref={mobileNavMenu}
                onTouchMove={onTouchMove}
                onTouchStart={onTouchToggle}
                onTouchEnd={onTouchToggle}>
                <NavMenuItem>
                  <RouteLink
                    to="/"
                    end
                    onClick={toggleMenu}>
                    <NavMenuTitle>
                      {
                        translations[lang].menu[
                          'ABOUT'
                        ]
                      }
                    </NavMenuTitle>
                  </RouteLink>
                </NavMenuItem>
                <MenuItems
                  items={menu}
                  render={(item) => (
                    <RouteLink
                      to={`/${item.url}`}
                      onClick={toggleMenu}>
                      <NavMenuTitle>
                        {
                          translations[lang].menu[
                            item.title
                          ]
                        }
                      </NavMenuTitle>
                    </RouteLink>
                  )}
                />
                <NavMenuItem />
                <NavMenuItem>
                  <Flex justify="space-between">
                    {items.map((item, index) => (
                      <Container
                        width="40%"
                        key={`item-${index}`}>
                        {item}
                      </Container>
                    ))}
                  </Flex>
                </NavMenuItem>
              </MobileNavMenu>
            </Backdrop>
          </Portal>
        ) : null}
      </NavMenuBar>
      <NavMenu>
        <MenuItems
          items={menu}
          render={(item) => (
            <RouteLink to={`/${item.url}`}>
              <NavMenuTitle>
                {translations[lang].menu[item.title]}
              </NavMenuTitle>
            </RouteLink>
          )}
        />
        <MenuItems items={items} />
      </NavMenu>
    </NavBar>
  );
};

export default Menu;
