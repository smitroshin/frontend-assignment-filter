import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import qs from 'qs';

const contentfulLoader = ({ src, width, quality }) => {
  const imgConfig = {
    fit: 'thumb',
    fm: 'jpg',
    w: width,
    q: quality || 75,
  };
  return `https:${src}?${qs.stringify(imgConfig)}`;
};
export function ProductCard(props) {
  const { thumbnailUrl, name, price, ...rest } = props;
  return (
    <article {...rest}>
      <Image
        src={thumbnailUrl}
        alt={name}
        placeholder="blur"
        blurDataURL={`https:${thumbnailUrl}?w=10&h=10`}
        loader={contentfulLoader}
        layout="intrinsic"
        width={600}
        height={600}
      />
      <div className="flex justify-between">
        <h3>{name}</h3>
        <div>€{price}</div>
      </div>
    </article>
  );
}

ProductCard.propTypes = {
  thumbnailUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

ProductCard.defaultProps = {};
