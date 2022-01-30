import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import {
  Header,
  ProductCard,
  ProductFilter,
  Pagination,
  Footer,
} from '../components';
import { APIRequest } from '../httpConfig';
import API from '../backend/api';

export function getServerSideProps(context) {
  const products = API.product.getAll(context);
  const availableColors = API.product.getAvailableColors();
  const availableCategoryTags = API.product.getAvailableCategoryTags();

  return {
    props: {
      products,
      availableColors,
      availableCategoryTags,
    },
  };
}

export default function Home(props) {
  const {
    products: productsProps,
    availableColors,
    availableCategoryTags,
  } = props;
  const [products, setProducts] = useState(productsProps);
  const router = useRouter();
  const qsQuery = qs.parse(router.query);

  const onClickPageHandle = useCallback(
    async (e) => {
      console.time('getData');
      const reqParams = {
        ...qsQuery,
        page: e.selected + 1,
      };
      const res = await APIRequest.get(
        `/product/getAll${qs.stringify(reqParams, { addQueryPrefix: true })}`,
      );
      console.timeEnd('getData');
      router.push(
        {
          search: qs.stringify(reqParams, { addQueryPrefix: true }),
        },
        undefined,
        { shallow: true },
      );
      setProducts(res.data);
    },
    [qsQuery, router],
  );

  const pagination = (
    <section className="flex justify-center items-center my-6">
      <Pagination
        onPageChange={onClickPageHandle}
        pageCount={products.pagination.total}
        forcePage={qsQuery.page - 1 || 0}
      />
    </section>
  );

  return (
    <div>
      <Head>
        <title>Miista assortment</title>
        <meta name="description" content="Filter Assignment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <ProductFilter
        className="container mx-auto px-4 mt-14"
        availableColors={availableColors}
        availableCategoryTags={availableCategoryTags}
        onFilterApplied={setProducts}
      />
      <main className="container mx-auto px-4 mb-12">
        {pagination}
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-6">
          {products.data.map((itm) => (
            <ProductCard
              key={itm.node.name}
              name={itm.node.name}
              thumbnailUrl={itm.node.thumbnailImage.file.url}
              price={itm.node.shopifyProductEu.variants.edges[0].node.price}
            />
          ))}
        </section>
        {!!products.data.length && pagination}
      </main>
      <Footer />
    </div>
  );
}

Home.propTypes = {
  products: PropTypes.shape({
    pagination: PropTypes.shape({
      current: PropTypes.number,
      total: PropTypes.number,
    }),
    data: PropTypes.arrayOf(
      PropTypes.shape({
        node: PropTypes.shape({
          name: PropTypes.string,
          node_locale: PropTypes.string,
          thumbnailImage: PropTypes.shape({
            file: PropTypes.shape({
              url: PropTypes.string,
            }),
          }),
          colorFamily: PropTypes.arrayOf(
            PropTypes.shape({
              name: PropTypes.string,
            }),
          ),
          categoryTags: PropTypes.arrayOf(PropTypes.string),
          shopifyProductEu: PropTypes.shape({
            variants: PropTypes.shape({
              edges: PropTypes.arrayOf(
                PropTypes.shape({
                  node: PropTypes.shape({
                    price: PropTypes.string,
                  }),
                }),
              ),
            }),
          }),
        }),
      }),
    ),
  }),
  availableColors: PropTypes.arrayOf(PropTypes.string),
  availableCategoryTags: PropTypes.arrayOf(PropTypes.string),
};

Home.defaultProps = {
  products: {
    pagination: {
      current: null,
      total: null,
    },
    data: [],
  },
  availableColors: [],
  availableCategoryTags: [],
};
