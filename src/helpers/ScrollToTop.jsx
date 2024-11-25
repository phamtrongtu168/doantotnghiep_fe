import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Cuộn cửa sổ chính lên đầu
    window.scrollTo(0, 0);

    // Cuộn tất cả các phần tử có khả năng cuộn lên đầu
    document.querySelectorAll('*').forEach((el) => {
      const style = window.getComputedStyle(el);
      if ((style.overflowY === 'auto' || style.overflowY === 'scroll') && el.scrollHeight > el.clientHeight) {
        el.scrollTop = 0;
      }
      if ((style.overflowX === 'auto' || style.overflowX === 'scroll') && el.scrollWidth > el.clientWidth) {
        el.scrollLeft = 0;
      }
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;