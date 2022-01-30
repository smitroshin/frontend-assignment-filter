import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import qs from 'qs';
import { useUpdateEffect } from 'react-use';
import { PriceRangeSlider } from '../priceRangeSlider';
import { TagsSelect } from '../tagsSelect';
import { APIRequest } from '../../httpConfig';

const DEFAULT_PRICE_RANGE = [0, 500];

function FilterItem(props) {
  const { title, children, ...rest } = props;
  return (
    <div {...rest} className="flex mb-3">
      <div className="mx-1 text" style={{ minWidth: 120 }}>
        {title}:
      </div>
      <div className="mx-1 flex-1">{children}</div>
    </div>
  );
}

FilterItem.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.elementType])
    .isRequired,
};

export function ProductFilter(props) {
  const { availableColors, availableCategoryTags, onFilterApplied, ...rest } =
    props;
  const router = useRouter();
  const qsQuery = qs.parse(router.query);
  const [filter, setFilter] = useState({
    ...qsQuery,
    priceRange: qsQuery.priceRange
      ? qsQuery.priceRange.map((itm) => parseInt(itm, 10))
      : DEFAULT_PRICE_RANGE,
  });

  useUpdateEffect(async () => {
    const res = await APIRequest.get(
      `/product/getAll${qs.stringify(
        {
          ...filter,
          priceRange:
            filter.priceRange[1] === DEFAULT_PRICE_RANGE[1]
              ? [...filter.priceRange, '+']
              : filter.priceRange,
        },
        { addQueryPrefix: true },
      )}`,
    );
    router.push(
      {
        search: qs.stringify(
          {
            ...filter,
            page: 1,
          },
          { addQueryPrefix: true },
        ),
      },
      undefined,
      { shallow: true },
    );
    onFilterApplied(res.data);
  }, [filter, onFilterApplied]);

  const onChangeHandle = useCallback((e) => {
    setFilter((prevState) => ({ ...prevState, [e.name]: e.value }));
  }, []);

  const onClickClearHandle = () => {
    setFilter({ page: 1, priceRange: DEFAULT_PRICE_RANGE });
  };

  return (
    <section {...rest}>
      <div className="flex items-start">
        <div>
          <FilterItem title="Category tags">
            <TagsSelect
              onChange={onChangeHandle}
              name="categoryTags"
              value={filter.categoryTags}
              tags={availableCategoryTags}
            />
          </FilterItem>
          <FilterItem title="Color">
            <TagsSelect
              onChange={onChangeHandle}
              name="color"
              value={filter.color}
              tags={availableColors}
            />
          </FilterItem>
          <FilterItem title="Color">
            <PriceRangeSlider
              min={DEFAULT_PRICE_RANGE[0]}
              max={DEFAULT_PRICE_RANGE[1]}
              onChange={onChangeHandle}
              name="priceRange"
              value={filter.priceRange}
              wrapperProps={{ style: { maxWidth: 250 } }}
            />
          </FilterItem>
        </div>
        <button
          type="button"
          className="whitespace-nowrap underline"
          onClick={onClickClearHandle}
        >
          Clear Filter
        </button>
      </div>
    </section>
  );
}

ProductFilter.propTypes = {
  availableColors: PropTypes.arrayOf(PropTypes.string),
  availableCategoryTags: PropTypes.arrayOf(PropTypes.string),
  onFilterApplied: PropTypes.func,
};

ProductFilter.defaultProps = {
  availableColors: [],
  availableCategoryTags: [],
  onFilterApplied: () => undefined,
};
