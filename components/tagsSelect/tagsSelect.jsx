import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export function TagsSelect(props) {
  const { tags, onChange, value, name, ...rest } = props;

  const onClickHandle = (tag) => (e) => {
    onChange(
      {
        name,
        value: value.includes(tag)
          ? value.filter((itm) => itm !== tag)
          : [...value, tag],
      },
      tag,
      e,
    );
  };

  const onClickAllHandle = (e) => {
    onChange(
      {
        name,
        value: [],
      },
      null,
      e,
    );
  };

  return (
    <div {...rest}>
      <button
        type="button"
        className={classNames('mr-3', !value.length && 'underline')}
        onClick={onClickAllHandle}
      >
        All
      </button>
      {tags.map((itm) => (
        <button
          key={itm}
          type="button"
          className={classNames('mr-3', value.includes(itm) && 'underline')}
          onClick={onClickHandle(itm)}
        >
          {itm}
        </button>
      ))}
    </div>
  );
}

TagsSelect.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ),
  onChange: PropTypes.func,
  value: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string,
};

TagsSelect.defaultProps = {
  tags: [],
  onChange: () => null,
  value: [],
  name: '',
};
