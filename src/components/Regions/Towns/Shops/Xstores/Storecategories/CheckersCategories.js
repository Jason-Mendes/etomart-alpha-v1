import React from "react";

function CheckersCategories() {
  const navcategories = [
    {
      name: "Welcome to the invitation 💌",
      imgSrc:
        "https://imageproxy.wolt.com/menu/menu-images/5e9819863b77a4c553fd9a48/edaa5498-a37a-11ec-9fec-c6b54fe3d9ba_________________.jpeg",
      href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-0",
    },
    {
      name: "1,2,3 Get started!",
      imgSrc:
        "https://imageproxy.wolt.com/menu/menu-images/5e9819863b77a4c553fd9a48/beeff388-7075-11ed-bb5f-f2a40b70dde9___________.jpeg",
      href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-1",
    },
    // Add more categories as needed
  ];

  return (
    <div>
      <div className="w-1/4 p-4">
        <div data-test-id="navigation-bar" className="sc-adf1bc0c-2 exbBdY">
          {navcategories.map((category, index) => (
            <div key={index} className="sc-adf1bc0c-8 iWbiGw">
              <a
                data-test-id="navigation-bar-link"
                className="sc-dad41f1f-0 QHyej"
                href={category.href}
              >
                <div className="sc-dad41f1f-2 issrEq">
                  <span className="sc-af12669c-0 fziZJo sc-dad41f1f-3 bIkfsI cb-elevated cb_elevation_elevationXsmall_equ2">
                    <img
                      loading="lazy"
                      decoding="async"
                      sizes="(min-width: 1024px) 5vw, (min-width: 640px) 7vw, 100vw"
                      srcSet={category.imgSrc}
                      src={category.imgSrc}
                      alt=""
                      draggable="true"
                      className="sc-af12669c-1 bmIuLw"
                    />
                  </span>
                </div>
                <div
                  data-test-id="NavigationListItem-title"
                  className="sc-dad41f1f-6 iuZpCn"
                >
                  {category.name}
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CheckersCategories;
