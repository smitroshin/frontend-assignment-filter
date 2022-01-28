import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';
import { useDebounce } from 'react-use';
import classNames from 'classnames';

import 'rc-slider/assets/index.css';

export const Range = Slider.createSliderWithTooltip(Slider.Range);

export function PriceRangeSlider(props) {
  const { onChange, className, min, max, value, name, wrapperProps, ...rest } =
    props;
  const [temp, setTemp] = useState(null);
  const valToRender = temp || value;

  const onChangeHandle = useCallback(
    (val) => {
      setTemp(val);
    },
    [setTemp],
  );

  useDebounce(
    () => {
      if (temp) {
        onChange({ name, value: temp });
        setTemp(null);
      }
    },
    300,
    [temp, name],
  );

  return (
    <div {...wrapperProps}>
      <div className="flex justify-between">
        <span>{valToRender ? valToRender[0] : min}€</span>
        <span>
          {valToRender ? valToRender[1] : max}€{valToRender[1] === max && '+'}
        </span>
      </div>
      <Range
        step={10}
        pushable
        {...rest}
        onChange={onChangeHandle}
        count={2}
        min={min}
        max={max}
        className={classNames('mx-1', className)}
        value={valToRender}
      />
    </div>
  );
}

PriceRangeSlider.defaultProps = {
  onChange: () => undefined,
  className: '',
  name: '',
  wrapperProps: {},
};

PriceRangeSlider.propTypes = {
  onChange: PropTypes.func,
  className: PropTypes.string,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.arrayOf(PropTypes.number).isRequired,
  name: PropTypes.string,
  wrapperProps: PropTypes.object,
};
