--
-- PostgreSQL database dump
--

\restrict yK8CxMDXuIYPwLtxVm8ww5pYrLqJVFLLUfD4ZYNWL1T7C0uzTAm5Suo9EYnXQGI

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: enum_users_role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_users_role AS ENUM (
    'admin',
    'user'
);


ALTER TYPE public.enum_users_role OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    image character varying(255) DEFAULT '/images/placeholder.jpg'::character varying NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_id_seq OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    "subCategoryId" integer NOT NULL,
    name character varying(255) NOT NULL,
    description text NOT NULL,
    specifications text DEFAULT ''::text,
    price numeric(10,2) NOT NULL,
    image character varying(255) DEFAULT '/images/placeholder.jpg'::character varying NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: sub_categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sub_categories (
    id integer NOT NULL,
    "categoryId" integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    image character varying(255) DEFAULT '/images/placeholder.jpg'::character varying
);


ALTER TABLE public.sub_categories OWNER TO postgres;

--
-- Name: sub_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sub_categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sub_categories_id_seq OWNER TO postgres;

--
-- Name: sub_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sub_categories_id_seq OWNED BY public.sub_categories.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role public.enum_users_role DEFAULT 'admin'::public.enum_users_role,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: sub_categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sub_categories ALTER COLUMN id SET DEFAULT nextval('public.sub_categories_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, name, image, "createdAt", "updatedAt") FROM stdin;
27	مستلزمات مخبرية	/images/category-lab-equipment.jpg	2025-11-30 19:48:19.93+03	2025-11-30 19:48:19.93+03
28	أجهزة ومعدات قياس	/images/slider-1.jpg	2025-11-30 19:48:19.934+03	2025-11-30 19:48:19.934+03
29	معامل تعليمية	/uploads/image-1764536101658-6257420.jpg	2025-11-30 19:48:19.937+03	2025-11-30 23:55:03.412+03
25	كيماويات وأوساط زراعية	/uploads/image-1764544978320-507138560.jpg	2025-11-30 19:48:19.912+03	2025-12-01 02:22:59.366+03
26	مستلزمات ومعدات طبية	/uploads/image-1764545023176-904129741.jpg	2025-11-30 19:48:19.923+03	2025-12-01 02:23:47.066+03
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, "subCategoryId", name, description, specifications, price, image, "createdAt", "updatedAt") FROM stdin;
1831	57	Acetic Acid Glacial 99.5% for Synthesis	Acetic Acid Glacial 99.5% for Synthesis		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.813+03	2025-11-30 22:07:07.813+03
1832	57	Acetic Acid Glacial 99.8-100.5% AR/ACS & P Test	Acetic Acid Glacial 99.8-100.5% AR/ACS & P Test		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.834+03	2025-11-30 22:07:07.834+03
1833	57	Acetone 99.5% AR/ACS	Acetone 99.5% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.838+03	2025-11-30 22:07:07.838+03
1834	57	Acetonitrile 99.5% AR/ACS	Acetonitrile 99.5% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.845+03	2025-11-30 22:07:07.845+03
1835	57	Acetonitrile 99.9% for HPLC & Spectroscopy	Acetonitrile 99.9% for HPLC & Spectroscopy		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.849+03	2025-11-30 22:07:07.849+03
1836	57	Acetonitrile 99.9% for HPLC Gradient Grade	Acetonitrile 99.9% for HPLC Gradient Grade		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.853+03	2025-11-30 22:07:07.853+03
1837	57	Acetyl Chloride 98% for Synthesis	Acetyl Chloride 98% for Synthesis		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.857+03	2025-11-30 22:07:07.857+03
1838	57	Acetyl Choline Chloride 99% AR	Acetyl Choline Chloride 99% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.86+03	2025-11-30 22:07:07.86+03
1839	57	Acrylic Acid 99% for Synthesis	Acrylic Acid 99% for Synthesis		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.862+03	2025-11-30 22:07:07.862+03
1840	57	Agar Powder for Bacteriology	Agar Powder for Bacteriology		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.864+03	2025-11-30 22:07:07.864+03
1841	57	Aluminum Metal Fine Powder 99%	Aluminum Metal Fine Powder 99%		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.865+03	2025-11-30 22:07:07.865+03
1842	57	Aluminum Ammonium Sulphate 12 Hydrate 99.5% AR	Aluminum Ammonium Sulphate 12 Hydrate 99.5% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.867+03	2025-11-30 22:07:07.867+03
1843	57	Aluminum Chloride Anhydrous 98% for Synthesis	Aluminum Chloride Anhydrous 98% for Synthesis		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.868+03	2025-11-30 22:07:07.868+03
1844	57	Aluminum Chloride Hexahydrate 99% AR	Aluminum Chloride Hexahydrate 99% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.869+03	2025-11-30 22:07:07.869+03
1845	57	Aluminum Nitrate Nonahydrate 98.5% AR/ACS	Aluminum Nitrate Nonahydrate 98.5% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.872+03	2025-11-30 22:07:07.872+03
1846	57	Aluminum Oxide Neutral pH 6.5-7.5	Aluminum Oxide Neutral pH 6.5-7.5		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.875+03	2025-11-30 22:07:07.875+03
1847	57	Aluminum Oxide 99.9% AR	Aluminum Oxide 99.9% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.88+03	2025-11-30 22:07:07.88+03
1848	57	Aluminum Sulphate Hexadecahydrate 99.5% AR/ACS	Aluminum Sulphate Hexadecahydrate 99.5% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.882+03	2025-11-30 22:07:07.882+03
1849	57	p-Amino Phenol Extra Pure	p-Amino Phenol Extra Pure		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.885+03	2025-11-30 22:07:07.885+03
1850	57	Ammonium Acetate (Crystals) 98% AR/ACS	Ammonium Acetate (Crystals) 98% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.887+03	2025-11-30 22:07:07.887+03
1851	57	Ammonium Benzoate 98% Purified	Ammonium Benzoate 98% Purified		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.89+03	2025-11-30 22:07:07.89+03
1852	57	Ammonium Bromide 99.5% AR/ACS	Ammonium Bromide 99.5% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.897+03	2025-11-30 22:07:07.897+03
1853	57	Ammonium Carbonate 31% AR/ACS	Ammonium Carbonate 31% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.9+03	2025-11-30 22:07:07.9+03
1854	57	Ammonium Chloride 99.8% AR	Ammonium Chloride 99.8% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.903+03	2025-11-30 22:07:07.903+03
1855	57	tri-Ammonium Citrate 98.5% AR	tri-Ammonium Citrate 98.5% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.907+03	2025-11-30 22:07:07.907+03
1856	57	Ammonium Ferrous Sulphate Hexahydrate 99% AR	Ammonium Ferrous Sulphate Hexahydrate 99% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.912+03	2025-11-30 22:07:07.912+03
1857	57	Ammonium Fluoride 98% AR	Ammonium Fluoride 98% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.914+03	2025-11-30 22:07:07.914+03
1858	57	Ammonium Formate 98% AR	Ammonium Formate 98% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.916+03	2025-11-30 22:07:07.916+03
1859	57	Ammonium Molybdate Tetrahydrate 99% AR	Ammonium Molybdate Tetrahydrate 99% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.917+03	2025-11-30 22:07:07.917+03
1860	57	Ammonium Oxalate Monohydrate 99.5% AR	Ammonium Oxalate Monohydrate 99.5% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.918+03	2025-11-30 22:07:07.918+03
1861	57	Ammonium Purpurate 85% AR/ACS	Ammonium Purpurate 85% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.92+03	2025-11-30 22:07:07.92+03
1862	57	Ammonium Sulphate 99.5% AR/ACS	Ammonium Sulphate 99.5% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.923+03	2025-11-30 22:07:07.923+03
1863	57	Ammonium-(+)-Tartrate 99% AR	Ammonium-(+)-Tartrate 99% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.926+03	2025-11-30 22:07:07.926+03
1864	57	Ammonium Thiocyanate 99% AR	Ammonium Thiocyanate 99% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.928+03	2025-11-30 22:07:07.928+03
1865	57	Aniline 99% for Synthesis	Aniline 99% for Synthesis		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.93+03	2025-11-30 22:07:07.93+03
1866	57	Aniline Hydrochloride 99-100.5% for Synthesis	Aniline Hydrochloride 99-100.5% for Synthesis		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.931+03	2025-11-30 22:07:07.931+03
1867	57	Aniline Sulphate 99% for Synthesis	Aniline Sulphate 99% for Synthesis		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.932+03	2025-11-30 22:07:07.932+03
1868	57	L-Ascorbic Acid 99.7% for Biochemistry AR	L-Ascorbic Acid 99.7% for Biochemistry AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.933+03	2025-11-30 22:07:07.933+03
1869	57	Barium Carbonate 99% AR/ACS	Barium Carbonate 99% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.935+03	2025-11-30 22:07:07.935+03
1870	57	Barium Chloride Dihydrate Crystals 99% Pure	Barium Chloride Dihydrate Crystals 99% Pure		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.936+03	2025-11-30 22:07:07.936+03
1871	57	Barium Chloride Dihydrate 99% AR/ACS	Barium Chloride Dihydrate 99% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.938+03	2025-11-30 22:07:07.938+03
1872	57	Barium Hydroxide Octahydrate 98% AR	Barium Hydroxide Octahydrate 98% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.941+03	2025-11-30 22:07:07.941+03
1873	57	Barium Nitrate 99.5% AR/ACS	Barium Nitrate 99.5% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.943+03	2025-11-30 22:07:07.943+03
1874	57	Barium Sulphate Precipitated 95%	Barium Sulphate Precipitated 95%		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.945+03	2025-11-30 22:07:07.945+03
1875	57	Barium Sulphate Precipitated 97.5% AR	Barium Sulphate Precipitated 97.5% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.946+03	2025-11-30 22:07:07.946+03
1876	57	Beeswax White for Histology	Beeswax White for Histology		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.947+03	2025-11-30 22:07:07.947+03
1877	57	Beeswax Yellow for Histology	Beeswax Yellow for Histology		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.948+03	2025-11-30 22:07:07.948+03
1878	57	Benedict's Reagent Qualitative	Benedict's Reagent Qualitative		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.949+03	2025-11-30 22:07:07.949+03
1879	57	Benzaldehyde 99% AR	Benzaldehyde 99% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.95+03	2025-11-30 22:07:07.95+03
1880	57	Benzalkonium Chloride 50% Solution	Benzalkonium Chloride 50% Solution		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.952+03	2025-11-30 22:07:07.952+03
1881	57	Benzamide 98.5% for Synthesis	Benzamide 98.5% for Synthesis		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.953+03	2025-11-30 22:07:07.953+03
1882	57	Benzanilide 99% for Synthesis	Benzanilide 99% for Synthesis		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.956+03	2025-11-30 22:07:07.956+03
1883	57	Benzoic Acid 99.9% AR	Benzoic Acid 99.9% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.958+03	2025-11-30 22:07:07.958+03
1884	57	Benzyl Alcohol 99% AR/ACS	Benzyl Alcohol 99% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.961+03	2025-11-30 22:07:07.961+03
1885	57	Benzyl Benzoate 98%	Benzyl Benzoate 98%		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.962+03	2025-11-30 22:07:07.962+03
1886	57	Bismuth Oxide 99%	Bismuth Oxide 99%		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.964+03	2025-11-30 22:07:07.964+03
1887	57	Bismuth Phosphate 98%	Bismuth Phosphate 98%		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.966+03	2025-11-30 22:07:07.966+03
1888	57	Bismuth Subnitrate 71% AR	Bismuth Subnitrate 71% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.967+03	2025-11-30 22:07:07.967+03
1889	57	Bismuth Sulphate 90%	Bismuth Sulphate 90%		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.969+03	2025-11-30 22:07:07.969+03
1890	57	Borax Decahydrate 99.5% AR/ACS	Borax Decahydrate 99.5% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.972+03	2025-11-30 22:07:07.972+03
1891	57	Boric Acid Crystals 99.5% AR	Boric Acid Crystals 99.5% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.974+03	2025-11-30 22:07:07.974+03
1892	57	Brilliant Green Indicator 95% for Microscopy	Brilliant Green Indicator 95% for Microscopy		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.975+03	2025-11-30 22:07:07.975+03
1893	57	Bromine Water	Bromine Water		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.979+03	2025-11-30 22:07:07.979+03
1894	57	Bromoform 99% Special Grade	Bromoform 99% Special Grade		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.981+03	2025-11-30 22:07:07.981+03
1895	57	1-Butane Sulphonic Acid Sodium Salt Anhydrous 99% AR	1-Butane Sulphonic Acid Sodium Salt Anhydrous 99% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.983+03	2025-11-30 22:07:07.983+03
1896	57	n-Butanol 99.5% AR	n-Butanol 99.5% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.986+03	2025-11-30 22:07:07.986+03
1897	57	2-Butanol 99.5% AR	2-Butanol 99.5% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.989+03	2025-11-30 22:07:07.989+03
1898	57	Tert-Butanol 99.5% AR	Tert-Butanol 99.5% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.992+03	2025-11-30 22:07:07.992+03
1899	57	Butylated Hydroxytoluene (BHT) 99%	Butylated Hydroxytoluene (BHT) 99%		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.994+03	2025-11-30 22:07:07.994+03
1900	57	Cadmium Acetate Dihydrate 99% AR	Cadmium Acetate Dihydrate 99% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.996+03	2025-11-30 22:07:07.996+03
1901	57	Cadmium Carbonate 62-66%	Cadmium Carbonate 62-66%		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.997+03	2025-11-30 22:07:07.997+03
1902	57	Cadmium Chloride Monohydrate 99% AR	Cadmium Chloride Monohydrate 99% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:07.999+03	2025-11-30 22:07:07.999+03
1903	57	Cadmium Iodide 99%	Cadmium Iodide 99%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08+03	2025-11-30 22:07:08+03
1904	57	Cadmium Oxide 99.5%	Cadmium Oxide 99.5%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.001+03	2025-11-30 22:07:08.001+03
1905	57	Cadmium Phosphate 98%	Cadmium Phosphate 98%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.002+03	2025-11-30 22:07:08.002+03
1906	57	Cadmium Sulphate 99.99% AR	Cadmium Sulphate 99.99% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.005+03	2025-11-30 22:07:08.005+03
1907	57	Caffeine Anhydrous 98% Pure	Caffeine Anhydrous 98% Pure		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.007+03	2025-11-30 22:07:08.007+03
1908	57	Calamine 98% Purified	Calamine 98% Purified		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.01+03	2025-11-30 22:07:08.01+03
1909	57	Calcium Acetate 99% AR/ACS for Soil Test	Calcium Acetate 99% AR/ACS for Soil Test		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.012+03	2025-11-30 22:07:08.012+03
1910	57	Calcium Carbide	Calcium Carbide		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.015+03	2025-11-30 22:07:08.015+03
1911	57	Calcium Carbonate Precipitated 99.5% AR	Calcium Carbonate Precipitated 99.5% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.017+03	2025-11-30 22:07:08.017+03
1912	57	Calcium Chloride Dihydrate 99% AR	Calcium Chloride Dihydrate 99% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.018+03	2025-11-30 22:07:08.018+03
1913	57	Calcium Hydroxide 96% AR	Calcium Hydroxide 96% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.02+03	2025-11-30 22:07:08.02+03
1914	57	Calcium Lactate 98% for Soil Test	Calcium Lactate 98% for Soil Test		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.024+03	2025-11-30 22:07:08.024+03
1915	57	Calcium Nitrate Tetrahydrate 99%	Calcium Nitrate Tetrahydrate 99%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.026+03	2025-11-30 22:07:08.026+03
1916	57	Calcium Oxide (Lumps) 97.5%	Calcium Oxide (Lumps) 97.5%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.029+03	2025-11-30 22:07:08.029+03
1917	57	Calcium Oxide Anhydrous Powder 96%	Calcium Oxide Anhydrous Powder 96%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.031+03	2025-11-30 22:07:08.031+03
1918	57	di-Calcium Phosphate Dihydrate 98%	di-Calcium Phosphate Dihydrate 98%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.032+03	2025-11-30 22:07:08.032+03
1919	57	tri-Calcium Phosphate 90%	tri-Calcium Phosphate 90%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.034+03	2025-11-30 22:07:08.034+03
1920	57	Calcium Sulphate Anhydrous 97%	Calcium Sulphate Anhydrous 97%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.036+03	2025-11-30 22:07:08.036+03
1921	57	Calcium Sulphate Dihydrate 99%	Calcium Sulphate Dihydrate 99%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.037+03	2025-11-30 22:07:08.037+03
1922	57	Calcium Tungstate 99.5%	Calcium Tungstate 99.5%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.04+03	2025-11-30 22:07:08.04+03
1923	57	Camphor MAR 97%	Camphor MAR 97%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.042+03	2025-11-30 22:07:08.042+03
1924	57	Carbopol Fuchsin Powder for Microscopy	Carbopol Fuchsin Powder for Microscopy		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.045+03	2025-11-30 22:07:08.045+03
1925	57	Carbon Tetrachloride 99.5% for Synthesis	Carbon Tetrachloride 99.5% for Synthesis		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.047+03	2025-11-30 22:07:08.047+03
1926	57	Carbon Tetrachloride 99.9% AR	Carbon Tetrachloride 99.9% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.048+03	2025-11-30 22:07:08.048+03
1927	57	Carbopol 934	Carbopol 934		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.049+03	2025-11-30 22:07:08.049+03
1928	57	Carboxymethyl Cellulose Sodium Salt	Carboxymethyl Cellulose Sodium Salt		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.05+03	2025-11-30 22:07:08.05+03
1929	57	Casein from Bovine Milk	Casein from Bovine Milk		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.052+03	2025-11-30 22:07:08.052+03
1930	57	Cellulose Powder	Cellulose Powder		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.053+03	2025-11-30 22:07:08.053+03
1931	57	Cetostearyl Alcohol 90% AR	Cetostearyl Alcohol 90% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.057+03	2025-11-30 22:07:08.057+03
1932	57	Cetrimide 96-101%	Cetrimide 96-101%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.06+03	2025-11-30 22:07:08.06+03
1933	57	Cetyl Alcohol 95% Pure	Cetyl Alcohol 95% Pure		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.062+03	2025-11-30 22:07:08.062+03
1934	57	Charcoal Activated AR	Charcoal Activated AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.064+03	2025-11-30 22:07:08.064+03
1935	57	Chloroacetic Acid Mono 99.5% AR	Chloroacetic Acid Mono 99.5% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.065+03	2025-11-30 22:07:08.065+03
1936	57	Chlorobenzene Mono 99.5% AR	Chlorobenzene Mono 99.5% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.067+03	2025-11-30 22:07:08.067+03
1937	57	Chloroform 99% AR	Chloroform 99% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.068+03	2025-11-30 22:07:08.068+03
1938	57	Cholesterol 95% Purified	Cholesterol 95% Purified		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.069+03	2025-11-30 22:07:08.069+03
1939	57	Chromium (III) Chloride Hexahydrate 96%	Chromium (III) Chloride Hexahydrate 96%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.073+03	2025-11-30 22:07:08.073+03
1940	57	Chromium (III) Sulphate Basic	Chromium (III) Sulphate Basic		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.076+03	2025-11-30 22:07:08.076+03
1941	57	Chromium Trioxide 99% AR	Chromium Trioxide 99% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.079+03	2025-11-30 22:07:08.079+03
1942	57	Cinnamic Acid 99.5% AR	Cinnamic Acid 99.5% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.081+03	2025-11-30 22:07:08.081+03
1943	57	Citric Acid Anhydrous 99.5% AR	Citric Acid Anhydrous 99.5% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.084+03	2025-11-30 22:07:08.084+03
1944	57	Citric Acid Monohydrate 99.5% AR	Citric Acid Monohydrate 99.5% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.085+03	2025-11-30 22:07:08.085+03
1945	57	Cobalt AAS Solution 1000 ppm	Cobalt AAS Solution 1000 ppm		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.087+03	2025-11-30 22:07:08.087+03
1946	57	Cobaltous Acetate Tetrahydrate 99-102% AR/ACS	Cobaltous Acetate Tetrahydrate 99-102% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.09+03	2025-11-30 22:07:08.09+03
1947	57	Cobaltous Carbonate 45-50%	Cobaltous Carbonate 45-50%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.092+03	2025-11-30 22:07:08.092+03
1948	57	Cobaltous Chloride Hexahydrate 99% AR	Cobaltous Chloride Hexahydrate 99% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.095+03	2025-11-30 22:07:08.095+03
1949	57	Cobaltous Nitrate Hexahydrate 99% AR/ACS	Cobaltous Nitrate Hexahydrate 99% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.096+03	2025-11-30 22:07:08.096+03
1950	57	Cobalt (II & III) Oxide 70%	Cobalt (II & III) Oxide 70%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.097+03	2025-11-30 22:07:08.097+03
1951	57	Cobaltous Sulphate Heptahydrate 99% AR	Cobaltous Sulphate Heptahydrate 99% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.098+03	2025-11-30 22:07:08.098+03
1952	57	Congo Red Indicator pH 3.0-5.2	Congo Red Indicator pH 3.0-5.2		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.099+03	2025-11-30 22:07:08.099+03
1953	57	Copper Metal Powder Electrolytic 99.5%	Copper Metal Powder Electrolytic 99.5%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.101+03	2025-11-30 22:07:08.101+03
1954	57	Copper Metal Powder Fine 99.7% AR	Copper Metal Powder Fine 99.7% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.102+03	2025-11-30 22:07:08.102+03
1955	57	Copper (II) Acetate Monohydrate 99% AR	Copper (II) Acetate Monohydrate 99% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.103+03	2025-11-30 22:07:08.103+03
1956	57	Copper (II) Carbonate 54-57%	Copper (II) Carbonate 54-57%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.107+03	2025-11-30 22:07:08.107+03
1957	57	Copper (II) Chloride Dihydrate 99% AR	Copper (II) Chloride Dihydrate 99% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.111+03	2025-11-30 22:07:08.111+03
1958	57	Copper (II) Nitrate Trihydrate 99.5% AR/ACS	Copper (II) Nitrate Trihydrate 99.5% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.114+03	2025-11-30 22:07:08.114+03
1959	57	Copper (II) Oxide Powder 99% AR/ACS	Copper (II) Oxide Powder 99% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.115+03	2025-11-30 22:07:08.115+03
1960	57	Copper (II) Sulphate Anhydrous 98%	Copper (II) Sulphate Anhydrous 98%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.117+03	2025-11-30 22:07:08.117+03
1961	57	Copper (II) Sulphate Pentahydrate 99.5% AR/ACS	Copper (II) Sulphate Pentahydrate 99.5% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.118+03	2025-11-30 22:07:08.118+03
1962	57	Cotton Blue for Microscopy	Cotton Blue for Microscopy		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.119+03	2025-11-30 22:07:08.119+03
1963	57	Crystal Violet 90% for Microscopy	Crystal Violet 90% for Microscopy		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.122+03	2025-11-30 22:07:08.122+03
1964	57	Cuprous Chloride 97% AR/ACS	Cuprous Chloride 97% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.126+03	2025-11-30 22:07:08.126+03
1965	57	Cuprous Oxide Red 94%	Cuprous Oxide Red 94%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.128+03	2025-11-30 22:07:08.128+03
1966	57	Cyclohexane 99.5% AR	Cyclohexane 99.5% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.13+03	2025-11-30 22:07:08.13+03
1967	57	Cyclohexanone 99.5% AR	Cyclohexanone 99.5% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.131+03	2025-11-30 22:07:08.131+03
1968	57	L-Cystine 99% for Biochemistry	L-Cystine 99% for Biochemistry		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.132+03	2025-11-30 22:07:08.132+03
1969	57	Dextrose Anhydrous AR	Dextrose Anhydrous AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.133+03	2025-11-30 22:07:08.133+03
1970	57	1,2-Dichloro Ethane 99% for Synthesis	1,2-Dichloro Ethane 99% for Synthesis		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.135+03	2025-11-30 22:07:08.135+03
1971	57	Dichloro Methane Pure 99% for Synthesis	Dichloro Methane Pure 99% for Synthesis		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.137+03	2025-11-30 22:07:08.137+03
1972	57	Dichloro Methane 99.5% AR	Dichloro Methane 99.5% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.14+03	2025-11-30 22:07:08.14+03
1973	57	2,6-Dichloro Phenol Indophenol Sodium Salt 98% AR	2,6-Dichloro Phenol Indophenol Sodium Salt 98% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.143+03	2025-11-30 22:07:08.143+03
1974	57	Diethanolamine 98% for Synthesis	Diethanolamine 98% for Synthesis		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.145+03	2025-11-30 22:07:08.145+03
1975	57	Diethyl Ether 99% AR	Diethyl Ether 99% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.146+03	2025-11-30 22:07:08.146+03
1976	57	Dimethyl Glyoxime 99% AR/ACS	Dimethyl Glyoxime 99% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.148+03	2025-11-30 22:07:08.148+03
1977	57	Diphenylamine 99% AR/ACS	Diphenylamine 99% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.149+03	2025-11-30 22:07:08.149+03
1978	57	Diphenyl Carbazone-Bromophenol Blue	Diphenyl Carbazone-Bromophenol Blue		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.15+03	2025-11-30 22:07:08.15+03
1979	57	Eosin Yellow Indicator 88% for Microscopy	Eosin Yellow Indicator 88% for Microscopy		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.151+03	2025-11-30 22:07:08.151+03
1980	57	Ferric Chloride Anhydrous 98%	Ferric Chloride Anhydrous 98%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.152+03	2025-11-30 22:07:08.152+03
1981	57	Ferric Oxide Red 95%	Ferric Oxide Red 95%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.154+03	2025-11-30 22:07:08.154+03
1982	57	Ferric Sulphate Hydrate 20.5%	Ferric Sulphate Hydrate 20.5%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.156+03	2025-11-30 22:07:08.156+03
1983	57	Ferrous Oxalate Dihydrate 99%	Ferrous Oxalate Dihydrate 99%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.159+03	2025-11-30 22:07:08.159+03
1984	57	Ferrous Sulphate Hydrate 86.89%	Ferrous Sulphate Hydrate 86.89%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.161+03	2025-11-30 22:07:08.161+03
1985	57	Formic Acid 98-100%	Formic Acid 98-100%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.162+03	2025-11-30 22:07:08.162+03
1986	57	D-(-)-Fructose	D-(-)-Fructose		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.163+03	2025-11-30 22:07:08.163+03
1987	57	Fuchsin Acid 60% for Microscopy	Fuchsin Acid 60% for Microscopy		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.164+03	2025-11-30 22:07:08.164+03
1988	57	Fuchsin Basic 88% for Microscopy	Fuchsin Basic 88% for Microscopy		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.166+03	2025-11-30 22:07:08.166+03
1989	57	Fumaric Acid 99% for Synthesis	Fumaric Acid 99% for Synthesis		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.167+03	2025-11-30 22:07:08.167+03
1990	57	D-(+)-Galactose	D-(+)-Galactose		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.169+03	2025-11-30 22:07:08.169+03
1991	57	Gallic Acid Monohydrate 98%	Gallic Acid Monohydrate 98%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.171+03	2025-11-30 22:07:08.171+03
1992	57	Gelatin Powder for Bacteriology	Gelatin Powder for Bacteriology		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.177+03	2025-11-30 22:07:08.177+03
1993	57	Gentian Violet 90% for Microscopy	Gentian Violet 90% for Microscopy		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.18+03	2025-11-30 22:07:08.18+03
1994	57	Giemsa's Stain for Microscopy	Giemsa's Stain for Microscopy		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.182+03	2025-11-30 22:07:08.182+03
1995	57	Giemsa's Stain Solution for Microscopy	Giemsa's Stain Solution for Microscopy		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.184+03	2025-11-30 22:07:08.184+03
1996	57	Glass Wool	Glass Wool		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.185+03	2025-11-30 22:07:08.185+03
1997	57	L-Glutamic Acid 99% for Biochemistry	L-Glutamic Acid 99% for Biochemistry		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.187+03	2025-11-30 22:07:08.187+03
1998	57	Gram's Iodine Solution	Gram's Iodine Solution		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.19+03	2025-11-30 22:07:08.19+03
2113	57	Sodium Formate 99% AR/ACS	Sodium Formate 99% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.413+03	2025-11-30 22:07:08.413+03
1999	57	Hematoxylin Monohydrate for Microscopy	Hematoxylin Monohydrate for Microscopy		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.192+03	2025-11-30 22:07:08.192+03
2000	57	1-Hexane Sulfonic Acid Sodium Salt 99% AR for HPLC	1-Hexane Sulfonic Acid Sodium Salt 99% AR for HPLC		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.195+03	2025-11-30 22:07:08.195+03
2001	57	Hydrazine Hydrate 99% AR	Hydrazine Hydrate 99% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.196+03	2025-11-30 22:07:08.196+03
2002	57	Hydrofluoric Acid 48% AR	Hydrofluoric Acid 48% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.197+03	2025-11-30 22:07:08.197+03
2003	57	Hydroquinone 99.5% AR	Hydroquinone 99.5% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.198+03	2025-11-30 22:07:08.198+03
2004	57	Immersion Oil for Microscopy	Immersion Oil for Microscopy		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.199+03	2025-11-30 22:07:08.199+03
2005	57	Iodine Resublimed 99.8% AR	Iodine Resublimed 99.8% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.201+03	2025-11-30 22:07:08.201+03
2006	57	Iron Metal Powder Electrolytic 300 Mesh 95%	Iron Metal Powder Electrolytic 300 Mesh 95%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.202+03	2025-11-30 22:07:08.202+03
2007	57	Kaolin Light	Kaolin Light		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.205+03	2025-11-30 22:07:08.205+03
2008	57	Kovac's Indole Reagent	Kovac's Indole Reagent		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.208+03	2025-11-30 22:07:08.208+03
2009	57	Lactic Acid 88% AR	Lactic Acid 88% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.211+03	2025-11-30 22:07:08.211+03
2010	57	Lactophenol for Microscopy	Lactophenol for Microscopy		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.213+03	2025-11-30 22:07:08.213+03
2011	57	Lactose Monohydrate for Bacteriology AR	Lactose Monohydrate for Bacteriology AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.214+03	2025-11-30 22:07:08.214+03
2012	57	Lanolin Anhydrous	Lanolin Anhydrous		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.215+03	2025-11-30 22:07:08.215+03
2013	57	Lead (II) Acetate Trihydrate 99.5% AR/ACS	Lead (II) Acetate Trihydrate 99.5% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.216+03	2025-11-30 22:07:08.216+03
2014	57	Lead (II) Carbonate 99% AR/ACS	Lead (II) Carbonate 99% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.217+03	2025-11-30 22:07:08.217+03
2015	57	Lead Nitrate 99.5% AR/ACS	Lead Nitrate 99.5% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.218+03	2025-11-30 22:07:08.218+03
2016	57	Lead Oxide Red 85%	Lead Oxide Red 85%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.22+03	2025-11-30 22:07:08.22+03
2017	57	Lead Sulphate 98%	Lead Sulphate 98%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.223+03	2025-11-30 22:07:08.223+03
2018	57	Leishman's Stain for Microscopy	Leishman's Stain for Microscopy		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.228+03	2025-11-30 22:07:08.228+03
2019	57	Leishman's Stain Solution	Leishman's Stain Solution		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.23+03	2025-11-30 22:07:08.23+03
2020	57	Lithium Acetate 99%	Lithium Acetate 99%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.232+03	2025-11-30 22:07:08.232+03
2021	57	Lithium Carbonate 99% AR	Lithium Carbonate 99% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.233+03	2025-11-30 22:07:08.233+03
2022	57	Lithium Chloride 99% AR	Lithium Chloride 99% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.235+03	2025-11-30 22:07:08.235+03
2023	57	Lithium Hydroxide Monohydrate 99% AR/ACS	Lithium Hydroxide Monohydrate 99% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.238+03	2025-11-30 22:07:08.238+03
2024	57	Lithium Sulphate Monohydrate 99% AR/ACS	Lithium Sulphate Monohydrate 99% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.242+03	2025-11-30 22:07:08.242+03
2025	57	Lugol's Iodine 5% Solution	Lugol's Iodine 5% Solution		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.246+03	2025-11-30 22:07:08.246+03
2026	57	Magnesium Acetate Tetrahydrate 99% AR/ACS	Magnesium Acetate Tetrahydrate 99% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.248+03	2025-11-30 22:07:08.248+03
2027	57	Magnesium Metal Ribbon 99.5%	Magnesium Metal Ribbon 99.5%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.249+03	2025-11-30 22:07:08.249+03
2028	57	Magnesium Carbonate Basic Light 40%	Magnesium Carbonate Basic Light 40%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.25+03	2025-11-30 22:07:08.25+03
2029	57	Magnesium Chloride Hexahydrate 99% AR	Magnesium Chloride Hexahydrate 99% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.251+03	2025-11-30 22:07:08.251+03
2030	57	Magnesium Citrate Hydrate 97%	Magnesium Citrate Hydrate 97%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.252+03	2025-11-30 22:07:08.252+03
2031	57	Magnesium Hydroxide 95%	Magnesium Hydroxide 95%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.255+03	2025-11-30 22:07:08.255+03
2032	57	Magnesium Nitrate Hexahydrate 99% AR/ACS	Magnesium Nitrate Hexahydrate 99% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.258+03	2025-11-30 22:07:08.258+03
2033	57	Magnesium Oxide Light 98% AR/ACS	Magnesium Oxide Light 98% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.261+03	2025-11-30 22:07:08.261+03
2034	57	Magnesium Stearate 3.8-5%	Magnesium Stearate 3.8-5%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.263+03	2025-11-30 22:07:08.263+03
2035	57	Magnesium Sulphate Heptahydrate 99.5% AR/ACS	Magnesium Sulphate Heptahydrate 99.5% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.264+03	2025-11-30 22:07:08.264+03
2036	57	Magnesium II 95% AR	Magnesium II 95% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.265+03	2025-11-30 22:07:08.265+03
2037	57	Malachite Green 90% for Microscopy	Malachite Green 90% for Microscopy		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.266+03	2025-11-30 22:07:08.266+03
2038	57	Maleic Acid 99.5% AR	Maleic Acid 99.5% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.268+03	2025-11-30 22:07:08.268+03
2039	57	D-(+)-Maltose Monohydrate Crystal	D-(+)-Maltose Monohydrate Crystal		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.27+03	2025-11-30 22:07:08.27+03
2040	57	Phenolphthalein TS	Phenolphthalein TS		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.273+03	2025-11-30 22:07:08.273+03
2041	57	Phenol Red 98% AR	Phenol Red 98% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.278+03	2025-11-30 22:07:08.278+03
2042	57	Phenyl Acetate 98%	Phenyl Acetate 98%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.28+03	2025-11-30 22:07:08.28+03
2043	57	Phenyl Hydrazine AR	Phenyl Hydrazine AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.282+03	2025-11-30 22:07:08.282+03
2044	57	Phenyl Hydrazine Hydrochloride 99% AR	Phenyl Hydrazine Hydrochloride 99% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.285+03	2025-11-30 22:07:08.285+03
2045	57	ortho-Phosphoric Acid 85–88% AR	ortho-Phosphoric Acid 85–88% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.287+03	2025-11-30 22:07:08.287+03
2046	57	Phthalic Acid 99.5% AR	Phthalic Acid 99.5% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.291+03	2025-11-30 22:07:08.291+03
2047	57	Picric Acid 99.8% AR	Picric Acid 99.8% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.294+03	2025-11-30 22:07:08.294+03
2048	57	Polyethylene Glycol 400	Polyethylene Glycol 400		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.296+03	2025-11-30 22:07:08.296+03
2049	57	Polyethylene Glycol 4000	Polyethylene Glycol 4000		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.297+03	2025-11-30 22:07:08.297+03
2050	57	Polyvinyl Alcohol Cold 99%	Polyvinyl Alcohol Cold 99%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.298+03	2025-11-30 22:07:08.298+03
2051	57	Potassium Acetate 99% AR/ACS	Potassium Acetate 99% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.299+03	2025-11-30 22:07:08.299+03
2052	57	Potassium Bicarbonate 99%	Potassium Bicarbonate 99%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.3+03	2025-11-30 22:07:08.3+03
2053	57	Potassium Bromide 99.5% AR/ACS	Potassium Bromide 99.5% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.301+03	2025-11-30 22:07:08.301+03
2054	57	Potassium Carbonate Anhydrous 99.9% AR/ACS	Potassium Carbonate Anhydrous 99.9% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.302+03	2025-11-30 22:07:08.302+03
2055	57	Potassium Chloride 99.5% AR	Potassium Chloride 99.5% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.305+03	2025-11-30 22:07:08.305+03
2171	57	Triethylamine 99.5% AR	Triethylamine 99.5% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.518+03	2025-11-30 22:07:08.518+03
2056	57	Potassium Chromate 99–99.5%	Potassium Chromate 99–99.5%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.308+03	2025-11-30 22:07:08.308+03
2057	57	Tri-Potassium Citrate 99% AR	Tri-Potassium Citrate 99% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.312+03	2025-11-30 22:07:08.312+03
2058	57	Potassium Dichromate 99.9% AR	Potassium Dichromate 99.9% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.313+03	2025-11-30 22:07:08.313+03
2059	57	Potassium Dihydrogen Ortho Phosphate 99.5–100.5% AR	Potassium Dihydrogen Ortho Phosphate 99.5–100.5% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.314+03	2025-11-30 22:07:08.314+03
2060	57	Potassium Ferricyanide 99% AR/ACS	Potassium Ferricyanide 99% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.315+03	2025-11-30 22:07:08.315+03
2061	57	Potassium Ferrocyanide 99% AR/ACS	Potassium Ferrocyanide 99% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.317+03	2025-11-30 22:07:08.317+03
2062	57	Potassium Fluoride Anhydrous 99% AR	Potassium Fluoride Anhydrous 99% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.318+03	2025-11-30 22:07:08.318+03
2063	57	Potassium Hydrogen Phthalate 99.9% AR	Potassium Hydrogen Phthalate 99.9% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.319+03	2025-11-30 22:07:08.319+03
2064	57	Potassium Hydrogen Sulphate 99% AR	Potassium Hydrogen Sulphate 99% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.322+03	2025-11-30 22:07:08.322+03
2065	57	Potassium Hydroxide Pellets 85% AR/Purified	Potassium Hydroxide Pellets 85% AR/Purified		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.326+03	2025-11-30 22:07:08.326+03
2066	57	Potassium Iodate 99.9% AR	Potassium Iodate 99.9% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.329+03	2025-11-30 22:07:08.329+03
2067	57	Potassium Iodide 99.8% AR/ACS	Potassium Iodide 99.8% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.33+03	2025-11-30 22:07:08.33+03
2068	57	Potassium Metabisulfite 97% AR	Potassium Metabisulfite 97% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.331+03	2025-11-30 22:07:08.331+03
2069	57	Potassium Nitrate 99.5% AR	Potassium Nitrate 99.5% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.332+03	2025-11-30 22:07:08.332+03
2070	57	Potassium Oxalate 99.5% AR/ACS	Potassium Oxalate 99.5% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.333+03	2025-11-30 22:07:08.333+03
2071	57	Potassium Permanganate 99–99.5% AR	Potassium Permanganate 99–99.5% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.334+03	2025-11-30 22:07:08.334+03
2072	57	Potassium Persulfate 99% AR	Potassium Persulfate 99% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.335+03	2025-11-30 22:07:08.335+03
2073	57	Potassium Sodium-(+)-Tartrate 99% AR/ACS	Potassium Sodium-(+)-Tartrate 99% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.337+03	2025-11-30 22:07:08.337+03
2074	57	Potassium Sorbate 99%	Potassium Sorbate 99%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.339+03	2025-11-30 22:07:08.339+03
2075	57	Potassium Sulfate 99.5% AR/ACS	Potassium Sulfate 99.5% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.342+03	2025-11-30 22:07:08.342+03
2076	57	Potassium Thiocyanate 99% AR	Potassium Thiocyanate 99% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.345+03	2025-11-30 22:07:08.345+03
2077	57	2-Propanol 99.5–99.8% AR	2-Propanol 99.5–99.8% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.346+03	2025-11-30 22:07:08.346+03
2078	57	Pyridine 99.5% AR	Pyridine 99.5% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.348+03	2025-11-30 22:07:08.348+03
2079	57	Saccharin Sodium Dihydrate 98%	Saccharin Sodium Dihydrate 98%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.349+03	2025-11-30 22:07:08.349+03
2080	57	Safranin O for Microscopy	Safranin O for Microscopy		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.351+03	2025-11-30 22:07:08.351+03
2081	57	Salicylaldehyde 99%	Salicylaldehyde 99%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.352+03	2025-11-30 22:07:08.352+03
2082	57	Salicylic Acid 99% AR	Salicylic Acid 99% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.355+03	2025-11-30 22:07:08.355+03
2083	57	Silica Gel Blue	Silica Gel Blue		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.359+03	2025-11-30 22:07:08.359+03
2084	57	Silica Gel 60-120 Mesh	Silica Gel 60-120 Mesh		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.362+03	2025-11-30 22:07:08.362+03
2085	57	Silica Gel 100-200 Mesh	Silica Gel 100-200 Mesh		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.364+03	2025-11-30 22:07:08.364+03
2086	57	Silica Gel GF 254	Silica Gel GF 254		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.367+03	2025-11-30 22:07:08.367+03
2087	57	Silicon Carbide 220–400 Mesh	Silicon Carbide 220–400 Mesh		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.368+03	2025-11-30 22:07:08.368+03
2088	57	Silicon Oil	Silicon Oil		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.37+03	2025-11-30 22:07:08.37+03
2089	57	Silver Metal Powder 99.9%	Silver Metal Powder 99.9%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.373+03	2025-11-30 22:07:08.373+03
2090	57	Silver Chloride 99% AR	Silver Chloride 99% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.375+03	2025-11-30 22:07:08.375+03
2091	57	Silver Nitrate 99.9% AR/ACS	Silver Nitrate 99.9% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.377+03	2025-11-30 22:07:08.377+03
2092	57	Silver Oxide 99% AR	Silver Oxide 99% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.379+03	2025-11-30 22:07:08.379+03
2093	57	Silver Sulphate 99% AR/ACS	Silver Sulphate 99% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.38+03	2025-11-30 22:07:08.38+03
2094	57	Skim Milk Powder for Microbiology	Skim Milk Powder for Microbiology		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.381+03	2025-11-30 22:07:08.381+03
2095	57	Sodium Metal / Granules 99% AR	Sodium Metal / Granules 99% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.383+03	2025-11-30 22:07:08.383+03
2096	57	Sodium Acetate Anhydrous 99% AR/ACS	Sodium Acetate Anhydrous 99% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.384+03	2025-11-30 22:07:08.384+03
2097	57	Sodium Acetate Trihydrate 99.5% AR	Sodium Acetate Trihydrate 99.5% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.385+03	2025-11-30 22:07:08.385+03
2098	57	Sodium Alginate	Sodium Alginate		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.386+03	2025-11-30 22:07:08.386+03
2099	57	Sodium Azide 99.5% AR	Sodium Azide 99.5% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.388+03	2025-11-30 22:07:08.388+03
2100	57	Sodium Benzoate 99.5% AR	Sodium Benzoate 99.5% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.391+03	2025-11-30 22:07:08.391+03
2101	57	Sodium Bisulphite 58.5%	Sodium Bisulphite 58.5%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.393+03	2025-11-30 22:07:08.393+03
2102	57	Sodium Carbonate Anhydrous 99.5% AR	Sodium Carbonate Anhydrous 99.5% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.395+03	2025-11-30 22:07:08.395+03
2103	57	Sodium Carbonate Monohydrate 99%	Sodium Carbonate Monohydrate 99%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.397+03	2025-11-30 22:07:08.397+03
2104	57	Sodium Chloride 99.5–99.9% AR/ACS	Sodium Chloride 99.5–99.9% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.398+03	2025-11-30 22:07:08.398+03
2105	57	Sodium Chromate Tetrahydrate 99% AR	Sodium Chromate Tetrahydrate 99% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.399+03	2025-11-30 22:07:08.399+03
2106	57	Tri-Sodium Citrate Dihydrate 99% AR/ACS	Tri-Sodium Citrate Dihydrate 99% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.4+03	2025-11-30 22:07:08.4+03
2107	57	Sodium Cobaltinitrite 95% AR	Sodium Cobaltinitrite 95% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.401+03	2025-11-30 22:07:08.401+03
2108	57	Sodium Cyanide 95%	Sodium Cyanide 95%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.402+03	2025-11-30 22:07:08.402+03
2109	57	Sodium Dichromate Dihydrate 99.5% AR	Sodium Dichromate Dihydrate 99.5% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.404+03	2025-11-30 22:07:08.404+03
2110	57	Sodium Dihydrogen Phosphate Dihydrate 98%	Sodium Dihydrogen Phosphate Dihydrate 98%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.407+03	2025-11-30 22:07:08.407+03
2111	57	Sodium Dithionite 80%	Sodium Dithionite 80%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.41+03	2025-11-30 22:07:08.41+03
2112	57	Sodium Fluoride 99% AR	Sodium Fluoride 99% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.412+03	2025-11-30 22:07:08.412+03
2114	57	Sodium Hydrogen Carbonate 99.7% AR	Sodium Hydrogen Carbonate 99.7% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.414+03	2025-11-30 22:07:08.414+03
2115	57	Di-Sodium Hydrogen Phosphate Anhydrous 99% AR	Di-Sodium Hydrogen Phosphate Anhydrous 99% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.415+03	2025-11-30 22:07:08.415+03
2116	57	Sodium Hydrogen Sulphate Monohydrate 99% AR	Sodium Hydrogen Sulphate Monohydrate 99% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.416+03	2025-11-30 22:07:08.416+03
2117	57	Sodium Hydroxide Pellets 98% AR	Sodium Hydroxide Pellets 98% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.417+03	2025-11-30 22:07:08.417+03
2118	57	Sodium Iodate AR	Sodium Iodate AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.418+03	2025-11-30 22:07:08.418+03
2119	57	Sodium Iodide 99.5–100.5% AR/ACS	Sodium Iodide 99.5–100.5% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.419+03	2025-11-30 22:07:08.419+03
2120	57	Sodium Lactate 60% Solution	Sodium Lactate 60% Solution		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.422+03	2025-11-30 22:07:08.422+03
2121	57	Sodium Lauryl Sulphate 99% AR (for SDS-PAGE)	Sodium Lauryl Sulphate 99% AR (for SDS-PAGE)		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.424+03	2025-11-30 22:07:08.424+03
2122	57	Sodium Metabisulphite 98% AR/ACS	Sodium Metabisulphite 98% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.428+03	2025-11-30 22:07:08.428+03
2123	57	Sodium Metasilicate Nonahydrate 95%	Sodium Metasilicate Nonahydrate 95%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.43+03	2025-11-30 22:07:08.43+03
2124	57	Sodium Molybdate 99% AR	Sodium Molybdate 99% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.431+03	2025-11-30 22:07:08.431+03
2125	57	Sodium Nitrate 98–99.5% AR/ACS	Sodium Nitrate 98–99.5% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.432+03	2025-11-30 22:07:08.432+03
2126	57	Sodium Nitrite 98% AR	Sodium Nitrite 98% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.434+03	2025-11-30 22:07:08.434+03
2127	57	Sodium Nitroprusside 99% AR/ACS	Sodium Nitroprusside 99% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.435+03	2025-11-30 22:07:08.435+03
2128	57	Sodium Oxalate 99.9% AR	Sodium Oxalate 99.9% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.438+03	2025-11-30 22:07:08.438+03
2129	57	Sodium Perchlorate Monohydrate 98% AR	Sodium Perchlorate Monohydrate 98% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.44+03	2025-11-30 22:07:08.44+03
2130	57	Sodium Peroxide 95% AR/ACS	Sodium Peroxide 95% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.442+03	2025-11-30 22:07:08.442+03
2131	57	Sodium Persulphate 95%	Sodium Persulphate 95%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.445+03	2025-11-30 22:07:08.445+03
2132	57	Sodium Salicylate 99–99.5% AR	Sodium Salicylate 99–99.5% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.446+03	2025-11-30 22:07:08.446+03
2133	57	Sodium Sulphate Anhydrous 99.5% AR/ACS	Sodium Sulphate Anhydrous 99.5% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.447+03	2025-11-30 22:07:08.447+03
2134	57	Sodium Sulphide Flakes 55–60%	Sodium Sulphide Flakes 55–60%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.449+03	2025-11-30 22:07:08.449+03
2135	57	Sodium Sulphite Anhydrous 96%	Sodium Sulphite Anhydrous 96%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.45+03	2025-11-30 22:07:08.45+03
2136	57	di-Sodium Tartrate 99% AR	di-Sodium Tartrate 99% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.451+03	2025-11-30 22:07:08.451+03
2137	57	Sodium Thiocyanate 99% AR/ACS	Sodium Thiocyanate 99% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.452+03	2025-11-30 22:07:08.452+03
2138	57	Sodium Thiosulphate Anhydrous 98% AR	Sodium Thiosulphate Anhydrous 98% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.453+03	2025-11-30 22:07:08.453+03
2139	57	Sodium Thiosulphate Pentahydrate 99.5% AR/ACS	Sodium Thiosulphate Pentahydrate 99.5% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.457+03	2025-11-30 22:07:08.457+03
2140	57	Sodium Tungstate Hydrated 98–99% AR	Sodium Tungstate Hydrated 98–99% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.461+03	2025-11-30 22:07:08.461+03
2141	57	Sodium-meta-Vanadate 98%	Sodium-meta-Vanadate 98%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.463+03	2025-11-30 22:07:08.463+03
2142	57	Sorbic Acid 98.5%	Sorbic Acid 98.5%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.465+03	2025-11-30 22:07:08.465+03
2143	57	D-Sorbitol 98% for Biochemistry	D-Sorbitol 98% for Biochemistry		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.466+03	2025-11-30 22:07:08.466+03
2144	57	Stannic Chloride Pentahydrate 97.5%	Stannic Chloride Pentahydrate 97.5%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.467+03	2025-11-30 22:07:08.467+03
2145	57	Stannous Chloride Dihydrate 98% AR/ACS	Stannous Chloride Dihydrate 98% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.469+03	2025-11-30 22:07:08.469+03
2146	57	Starch Corn	Starch Corn		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.471+03	2025-11-30 22:07:08.471+03
2147	57	Starch Soluble	Starch Soluble		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.474+03	2025-11-30 22:07:08.474+03
2148	57	Stearic Acid 98% for Synthesis	Stearic Acid 98% for Synthesis		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.476+03	2025-11-30 22:07:08.476+03
2149	57	Strontium Chloride 99% AR/ACS	Strontium Chloride 99% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.478+03	2025-11-30 22:07:08.478+03
2150	57	Strontium Nitrate 99% AR/ACS	Strontium Nitrate 99% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.479+03	2025-11-30 22:07:08.479+03
2151	57	Strontium Sulphate 98%	Strontium Sulphate 98%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.48+03	2025-11-30 22:07:08.48+03
2152	57	Sucrose 99.5% AR/ACS	Sucrose 99.5% AR/ACS		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.481+03	2025-11-30 22:07:08.481+03
2153	57	Sudan III 85% for Microscopy	Sudan III 85% for Microscopy		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.482+03	2025-11-30 22:07:08.482+03
2154	57	Sulphamic Acid 99.5% AR	Sulphamic Acid 99.5% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.483+03	2025-11-30 22:07:08.483+03
2155	57	Sulphanilic Acid 98–99% AR	Sulphanilic Acid 98–99% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.484+03	2025-11-30 22:07:08.484+03
2156	57	Sulphuric Acid 98% AR	Sulphuric Acid 98% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.485+03	2025-11-30 22:07:08.485+03
2157	57	Tannic Acid 90% AR	Tannic Acid 90% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.487+03	2025-11-30 22:07:08.487+03
2158	57	L-(+)-Tartaric Acid 99.5% AR	L-(+)-Tartaric Acid 99.5% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.489+03	2025-11-30 22:07:08.489+03
2159	57	Tetrabutyl Ammonium Hydrogen Sulphate 0.98	Tetrabutyl Ammonium Hydrogen Sulphate 0.98		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.492+03	2025-11-30 22:07:08.492+03
2160	57	Tetrabutyl Ammonium Hydroxide 0.1 N	Tetrabutyl Ammonium Hydroxide 0.1 N		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.495+03	2025-11-30 22:07:08.495+03
2161	57	Tetrabutyl Ammonium Iodide 99% AR	Tetrabutyl Ammonium Iodide 99% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.496+03	2025-11-30 22:07:08.496+03
2162	57	Tetrahydrofuran 99.5% AR	Tetrahydrofuran 99.5% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.498+03	2025-11-30 22:07:08.498+03
2163	57	Thioglycollic Acid 80%	Thioglycollic Acid 80%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.5+03	2025-11-30 22:07:08.5+03
2164	57	Thiourea 99% AR	Thiourea 99% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.501+03	2025-11-30 22:07:08.501+03
2165	57	Thymol Crystals 99.5% AR	Thymol Crystals 99.5% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.503+03	2025-11-30 22:07:08.503+03
2166	57	Tin Metal Powder 99.5% AR	Tin Metal Powder 99.5% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.507+03	2025-11-30 22:07:08.507+03
2167	57	Titanium Dioxide 99% AR	Titanium Dioxide 99% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.511+03	2025-11-30 22:07:08.511+03
2168	57	Toluene 99.5% AR	Toluene 99.5% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.513+03	2025-11-30 22:07:08.513+03
2169	57	Trichloroacetic Acid 99.5% AR	Trichloroacetic Acid 99.5% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.515+03	2025-11-30 22:07:08.515+03
2170	57	Triethanolamine 99% AR	Triethanolamine 99% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.516+03	2025-11-30 22:07:08.516+03
2172	57	Trifluoroacetic Acid 98%	Trifluoroacetic Acid 98%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.52+03	2025-11-30 22:07:08.52+03
2173	57	Tween 20	Tween 20		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.524+03	2025-11-30 22:07:08.524+03
2174	57	Tween 80	Tween 80		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.528+03	2025-11-30 22:07:08.528+03
2175	57	L-Tyrosine 98.5% for Biochemistry	L-Tyrosine 98.5% for Biochemistry		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.529+03	2025-11-30 22:07:08.529+03
2176	57	Urea Crystal Pure 99% for Biochemistry	Urea Crystal Pure 99% for Biochemistry		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.53+03	2025-11-30 22:07:08.53+03
2177	57	Urea 99–101% AR	Urea 99–101% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.531+03	2025-11-30 22:07:08.531+03
2178	57	Uric Acid 99% AR	Uric Acid 99% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.533+03	2025-11-30 22:07:08.533+03
2179	57	Vanillin 99% AR	Vanillin 99% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.534+03	2025-11-30 22:07:08.534+03
2180	57	W.B.C. Diluting Fluid (Truck's)	W.B.C. Diluting Fluid (Truck's)		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.535+03	2025-11-30 22:07:08.535+03
2181	57	Xylene 99.8% AR	Xylene 99.8% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.537+03	2025-11-30 22:07:08.537+03
2182	57	Zinc Metal Dust 99.5% AR	Zinc Metal Dust 99.5% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.54+03	2025-11-30 22:07:08.54+03
2183	57	Zinc Metal Granular 99.7% AR	Zinc Metal Granular 99.7% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.544+03	2025-11-30 22:07:08.544+03
2184	57	Zinc Metal Powder 99.9% AR	Zinc Metal Powder 99.9% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.546+03	2025-11-30 22:07:08.546+03
2185	57	Zinc Acetate 99.5% AR	Zinc Acetate 99.5% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.548+03	2025-11-30 22:07:08.548+03
2186	57	Zinc Carbonate Basic 58%	Zinc Carbonate Basic 58%		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.549+03	2025-11-30 22:07:08.549+03
2187	57	Zinc Chloride (Dry) 98% AR	Zinc Chloride (Dry) 98% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.551+03	2025-11-30 22:07:08.551+03
2188	57	Zinc Nitrate Hexahydrate 99% AR	Zinc Nitrate Hexahydrate 99% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.552+03	2025-11-30 22:07:08.552+03
2189	57	Zinc Oxide 99–100.5% AR	Zinc Oxide 99–100.5% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.555+03	2025-11-30 22:07:08.555+03
2190	57	Zinc Stearate Pure	Zinc Stearate Pure		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.557+03	2025-11-30 22:07:08.557+03
2191	57	Zinc Sulphate Heptahydrate 99.5% AR	Zinc Sulphate Heptahydrate 99.5% AR		0.00	/images/placeholder.jpg	2025-11-30 22:07:08.559+03	2025-11-30 22:07:08.559+03
2192	58	كلورا الأصلي 45 كيلو تركيز 70%	كلورا الأصلي 45 كيلو تركيز 70%		0.00	/images/placeholder.jpg	2025-11-30 22:09:46.756+03	2025-11-30 22:09:46.756+03
2193	58	حمض الخليك غذائي 35 كيلو تركيز 99.85	حمض الخليك غذائي 35 كيلو تركيز 99.85		0.00	/images/placeholder.jpg	2025-11-30 22:09:46.774+03	2025-11-30 22:09:46.774+03
2194	58	حمض الهيدروكلوريك 40 كيلو تركيز 33 - 35%	حمض الهيدروكلوريك 40 كيلو تركيز 33 - 35%		0.00	/images/placeholder.jpg	2025-11-30 22:09:46.779+03	2025-11-30 22:09:46.779+03
2195	58	تايلوز كوري 20 كيلو	تايلوز كوري 20 كيلو		0.00	/images/placeholder.jpg	2025-11-30 22:09:46.783+03	2025-11-30 22:09:46.783+03
2196	58	سلفونيك سعودي 230 كيلو (ابكو)	سلفونيك سعودي 230 كيلو (ابكو)		0.00	/images/placeholder.jpg	2025-11-30 22:09:46.787+03	2025-11-30 22:09:46.787+03
2197	58	سلفونيك سعودي 220 كيلو (الوطنية)	سلفونيك سعودي 220 كيلو (الوطنية)		0.00	/images/placeholder.jpg	2025-11-30 22:09:46.793+03	2025-11-30 22:09:46.793+03
2198	58	تكسابون سعودي 220 كيلو	تكسابون سعودي 220 كيلو		0.00	/images/placeholder.jpg	2025-11-30 22:09:46.799+03	2025-11-30 22:09:46.799+03
2199	58	صودا قشور كويتي 99%	صودا قشور كويتي 99%		0.00	/images/placeholder.jpg	2025-11-30 22:09:46.801+03	2025-11-30 22:09:46.801+03
2200	58	صودا قشور عماني 99.9%	صودا قشور عماني 99.9%		0.00	/images/placeholder.jpg	2025-11-30 22:09:46.803+03	2025-11-30 22:09:46.803+03
2201	58	صودا سائل عماني 50%	صودا سائل عماني 50%		0.00	/images/placeholder.jpg	2025-11-30 22:09:46.808+03	2025-11-30 22:09:46.808+03
2202	58	صودا حبيبات سعودي 99.9%	صودا حبيبات سعودي 99.9%		0.00	/images/placeholder.jpg	2025-11-30 22:09:46.813+03	2025-11-30 22:09:46.813+03
2203	58	صودا أش لايت 99%	صودا أش لايت 99%		0.00	/images/placeholder.jpg	2025-11-30 22:09:46.816+03	2025-11-30 22:09:46.816+03
2204	58	بيكربونات الصوديوم	بيكربونات الصوديوم		0.00	/images/placeholder.jpg	2025-11-30 22:09:46.818+03	2025-11-30 22:09:46.818+03
2205	58	كربونات الصوديوم	كربونات الصوديوم		0.00	/images/placeholder.jpg	2025-11-30 22:09:46.822+03	2025-11-30 22:09:46.822+03
2206	58	الأسيتون	الأسيتون		0.00	/images/placeholder.jpg	2025-11-30 22:09:46.825+03	2025-11-30 22:09:46.825+03
2207	58	تراي صوديوم فوسفات	تراي صوديوم فوسفات		0.00	/images/placeholder.jpg	2025-11-30 22:09:46.83+03	2025-11-30 22:09:46.83+03
2208	58	تراي صوديوم سترات	تراي صوديوم سترات		0.00	/images/placeholder.jpg	2025-11-30 22:09:46.833+03	2025-11-30 22:09:46.833+03
2209	58	صوديوم ميتاباي سولفت	صوديوم ميتاباي سولفت		0.00	/images/placeholder.jpg	2025-11-30 22:09:46.835+03	2025-11-30 22:09:46.835+03
2210	58	صوديوم هكساميتا فوسفات	صوديوم هكساميتا فوسفات		0.00	/images/placeholder.jpg	2025-11-30 22:09:46.839+03	2025-11-30 22:09:46.839+03
2211	58	سوربات البوتاسيوم	سوربات البوتاسيوم		0.00	/images/placeholder.jpg	2025-11-30 22:09:46.842+03	2025-11-30 22:09:46.842+03
2212	58	سترات الصوديوم	سترات الصوديوم		0.00	/images/placeholder.jpg	2025-11-30 22:09:46.846+03	2025-11-30 22:09:46.846+03
2213	58	فيتامين سي	فيتامين سي		0.00	/images/placeholder.jpg	2025-11-30 22:09:46.849+03	2025-11-30 22:09:46.849+03
2214	58	بنزوات الصوديوم	بنزوات الصوديوم		0.00	/images/placeholder.jpg	2025-11-30 22:09:46.85+03	2025-11-30 22:09:46.85+03
2215	58	كربوكسي ميثيل السيللوز CMC	كربوكسي ميثيل السيللوز CMC		0.00	/images/placeholder.jpg	2025-11-30 22:09:46.853+03	2025-11-30 22:09:46.853+03
2216	58	حمض لاكتيك	حمض لاكتيك		0.00	/images/placeholder.jpg	2025-11-30 22:09:46.857+03	2025-11-30 22:09:46.857+03
2217	58	حمض البوريك	حمض البوريك		0.00	/images/placeholder.jpg	2025-11-30 22:09:46.861+03	2025-11-30 22:09:46.861+03
2218	58	بوركس	بوركس		0.00	/images/placeholder.jpg	2025-11-30 22:09:46.866+03	2025-11-30 22:09:46.866+03
2219	58	ستريك اسيد أني هيدرات (ملح الليمون)	ستريك اسيد أني هيدرات (ملح الليمون)		0.00	/images/placeholder.jpg	2025-11-30 22:09:46.868+03	2025-11-30 22:09:46.868+03
2220	58	ستريك اسيد موني هيدرات	ستريك اسيد موني هيدرات		0.00	/images/placeholder.jpg	2025-11-30 22:09:46.872+03	2025-11-30 22:09:46.872+03
2221	58	كمبرلان سعودي 220 كيلو	كمبرلان سعودي 220 كيلو		0.00	/images/placeholder.jpg	2025-11-30 22:09:46.877+03	2025-11-30 22:09:46.877+03
2222	58	بيتايين سعودي 220 كيلو	بيتايين سعودي 220 كيلو		0.00	/images/placeholder.jpg	2025-11-30 22:09:46.88+03	2025-11-30 22:09:46.88+03
2223	58	فورمالين سعودي 32 كيلو	فورمالين سعودي 32 كيلو		0.00	/images/placeholder.jpg	2025-11-30 22:09:46.882+03	2025-11-30 22:09:46.882+03
2224	58	اديتا 20 كيلو	اديتا 20 كيلو		0.00	/images/placeholder.jpg	2025-11-30 22:09:46.885+03	2025-11-30 22:09:46.885+03
2225	59	كؤوس زجاجية بيكر	كؤوس زجاجية بيكر	الأحجام المتوفرة: 5000 - 3000 - 2000 - 1000 - 500 - 250 - 100 - 50 - 25	0.00	/images/placeholder.jpg	2025-11-30 22:09:50.049+03	2025-11-30 22:09:50.049+03
2226	59	دوارق مخروطية كونكل فلاسك	دوارق مخروطية كونكل فلاسك	الأحجام المتوفرة: 5000 - 3000 - 2000 - 1000 - 500 - 250 - 100 - 50	0.00	/images/placeholder.jpg	2025-11-30 22:09:50.068+03	2025-11-30 22:09:50.068+03
2227	59	دوارق مخروطية كونكل فلاسك مع الغطاء	دوارق مخروطية كونكل فلاسك مع الغطاء	الأحجام المتوفرة: 250 - 500	0.00	/images/placeholder.jpg	2025-11-30 22:09:50.072+03	2025-11-30 22:09:50.072+03
2228	59	دوارق كروية	دوارق كروية	الأحجام المتوفرة: 50 - 100 - 250 - 500 - 1000 - 2000	0.00	/images/placeholder.jpg	2025-11-30 22:09:50.078+03	2025-11-30 22:09:50.078+03
2229	59	مخبار سلندر زجاجي	مخبار سلندر زجاجي	الأحجام المتوفرة: 2000 - 1000 - 500 - 250 - 100 - 50 - 25 - 10	0.00	/images/placeholder.jpg	2025-11-30 22:09:50.082+03	2025-11-30 22:09:50.082+03
2230	59	قوارير حجمية	قوارير حجمية	الأحجام المتوفرة: 2000 - 1000 - 500 - 250 - 100 - 50 - 25 - 10 - 5	0.00	/images/placeholder.jpg	2025-11-30 22:09:50.087+03	2025-11-30 22:09:50.087+03
2231	59	قمع فصل مخروطي	قمع فصل مخروطي	الأحجام المتوفرة: 60 - 125 - 250 - 500 - 1000	0.00	/images/placeholder.jpg	2025-11-30 22:09:50.092+03	2025-11-30 22:09:50.092+03
2232	59	طقم مكثف تقطير سكسوليت	طقم مكثف تقطير سكسوليت	الأحجام المتوفرة: 250 - 500 - 1000	0.00	/images/placeholder.jpg	2025-11-30 22:09:50.097+03	2025-11-30 22:09:50.097+03
2233	59	مكثف تقطير زجاجي	مكثف تقطير زجاجي	الأحجام المتوفرة: 250 - 500 - 1000	0.00	/images/placeholder.jpg	2025-11-30 22:09:50.1+03	2025-11-30 22:09:50.1+03
2234	59	مكثف تقطير حلزوني زجاجي	مكثف تقطير حلزوني زجاجي	الأحجام المتوفرة: 250 - 500	0.00	/images/placeholder.jpg	2025-11-30 22:09:50.102+03	2025-11-30 22:09:50.102+03
2235	59	توصيلات مكثف جميع الأشكال – وحدة ترشيح فلتريشن زجاجية	توصيلات مكثف جميع الأشكال – وحدة ترشيح فلتريشن زجاجية		0.00	/images/placeholder.jpg	2025-11-30 22:09:50.106+03	2025-11-30 22:09:50.106+03
2236	59	ماصات زجاجية	ماصات زجاجية	الأحجام المتوفرة: 1 - 2 - 5 - 10 - 25	0.00	/images/placeholder.jpg	2025-11-30 22:09:50.11+03	2025-11-30 22:09:50.11+03
2237	59	ماصات زجاجية حجمية	ماصات زجاجية حجمية	الأحجام المتوفرة: 1 - 2 - 5 - 25 - 50	0.00	/images/placeholder.jpg	2025-11-30 22:09:50.114+03	2025-11-30 22:09:50.114+03
2238	59	سحاحة زجاجية	سحاحة زجاجية	الأحجام المتوفرة: 100 - 50 - 25	0.00	/images/placeholder.jpg	2025-11-30 22:09:50.116+03	2025-11-30 22:09:50.116+03
2239	59	قنينة كثافة	قنينة كثافة	الأحجام المتوفرة: 25 - 50	0.00	/images/placeholder.jpg	2025-11-30 22:09:50.119+03	2025-11-30 22:09:50.119+03
2240	59	جفنة صهر خزف	جفنة صهر خزف	الأحجام المتوفرة: 25 - 35 - 45 - 60 - 75	0.00	/images/placeholder.jpg	2025-11-30 22:09:50.123+03	2025-11-30 22:09:50.123+03
2241	59	بواتق خزف بدون غطاء	بواتق خزف بدون غطاء	الأحجام المتوفرة: 75 - 100 - 120 - 250	0.00	/images/placeholder.jpg	2025-11-30 22:09:50.128+03	2025-11-30 22:09:50.128+03
2242	59	مدق هاون	مدق هاون	الأحجام المتوفرة: 150 - 120 - 90 - 60	0.00	/images/placeholder.jpg	2025-11-30 22:09:50.131+03	2025-11-30 22:09:50.131+03
2243	59	مدق هاون زجاجي	مدق هاون زجاجي	الأحجام المتوفرة: 150 - 120 - 90 - 60	0.00	/images/placeholder.jpg	2025-11-30 22:09:50.133+03	2025-11-30 22:09:50.133+03
2244	59	حوض زجاجي	حوض زجاجي		0.00	/images/placeholder.jpg	2025-11-30 22:09:50.135+03	2025-11-30 22:09:50.135+03
2245	59	قمع خزف بوخنر	قمع خزف بوخنر	الأحجام المتوفرة: 120 - 90 - 60	0.00	/images/placeholder.jpg	2025-11-30 22:09:50.144+03	2025-11-30 22:09:50.144+03
2246	59	دوارق مخروطية فتحة جانبية	دوارق مخروطية فتحة جانبية	الأحجام المتوفرة: 250 - 500 - 1000	0.00	/images/placeholder.jpg	2025-11-30 22:09:53.205+03	2025-11-30 22:09:53.205+03
2247	59	مقياس حرارة موائ	مقياس حرارة موائ	الأحجام المتوفرة: 320 - 250 - 120	0.00	/images/placeholder.jpg	2025-11-30 22:09:53.223+03	2025-11-30 22:09:53.223+03
2248	59	زجاجة محاليل ريجنت بوتل معتمة وشفافة	زجاجة محاليل ريجنت بوتل معتمة وشفافة	الأحجام المتوفرة: 2500 - 1000 - 500 - 250 - 125	0.00	/images/placeholder.jpg	2025-11-30 22:09:53.228+03	2025-11-30 22:09:53.228+03
2249	59	زجاجة تعقيم اوتكلاف غطاء ازرق	زجاجة تعقيم اوتكلاف غطاء ازرق	الأحجام المتوفرة: 1000 - 500 - 250 - 100	0.00	/images/placeholder.jpg	2025-11-30 22:09:53.236+03	2025-11-30 22:09:53.236+03
2250	59	دروبنق بوتل قطارات زجاجية	دروبنق بوتل قطارات زجاجية	الأحجام المتوفرة: 60 - 120 - 250	0.00	/images/placeholder.jpg	2025-11-30 22:09:53.239+03	2025-11-30 22:09:53.239+03
2251	59	اقماع زجاجية	اقماع زجاجية	الأحجام المتوفرة: 60 - 75 - 90 - 100 - 120	0.00	/images/placeholder.jpg	2025-11-30 22:09:53.243+03	2025-11-30 22:09:53.243+03
2252	59	مجفف زجاجي دسكتر	مجفف زجاجي دسكتر		0.00	/images/placeholder.jpg	2025-11-30 22:09:53.248+03	2025-11-30 22:09:53.248+03
2253	59	فسكوميتر	فسكوميتر		0.00	/images/placeholder.jpg	2025-11-30 22:09:53.252+03	2025-11-30 22:09:53.252+03
2254	59	انابيب زجاجية	انابيب زجاجية	الأحجام المتوفرة: 5 - 10 - 25 - 50	0.00	/images/placeholder.jpg	2025-11-30 22:09:53.256+03	2025-11-30 22:09:53.256+03
2255	59	انابيب نسلر تیوب	انابيب نسلر تیوب		0.00	/images/placeholder.jpg	2025-11-30 22:09:53.258+03	2025-11-30 22:09:53.258+03
2256	59	اطباق زجاجية بتري دش	اطباق زجاجية بتري دش		0.00	/images/placeholder.jpg	2025-11-30 22:09:53.261+03	2025-11-30 22:09:53.261+03
2257	59	مكثف كلفنجر	مكثف كلفنجر		0.00	/images/placeholder.jpg	2025-11-30 22:09:53.265+03	2025-11-30 22:09:53.265+03
2258	59	عمود كولوم زجاجي	عمود كولوم زجاجي		0.00	/images/placeholder.jpg	2025-11-30 22:09:53.27+03	2025-11-30 22:09:53.27+03
2259	59	حوض TLC	حوض TLC		0.00	/images/placeholder.jpg	2025-11-30 22:09:53.272+03	2025-11-30 22:09:53.272+03
2260	59	حوض صبغ شرائح	حوض صبغ شرائح		0.00	/images/placeholder.jpg	2025-11-30 22:09:53.274+03	2025-11-30 22:09:53.274+03
2261	59	أسبرت لامب	أسبرت لامب		0.00	/images/placeholder.jpg	2025-11-30 22:09:53.276+03	2025-11-30 22:09:53.276+03
2262	59	زجاجة ساعة	زجاجة ساعة		0.00	/images/placeholder.jpg	2025-11-30 22:09:53.281+03	2025-11-30 22:09:53.281+03
2263	59	طقم انابيب توصيل قابلة لتشكيل	طقم انابيب توصيل قابلة لتشكيل		0.00	/images/placeholder.jpg	2025-11-30 22:09:53.284+03	2025-11-30 22:09:53.284+03
2264	59	مكعب كوارتز - زجاج	مكعب كوارتز - زجاج		0.00	/images/placeholder.jpg	2025-11-30 22:09:53.291+03	2025-11-30 22:09:53.291+03
2265	59	بيكر بلاستيك	بيكر بلاستيك	الأحجام المتوفرة: 5000 - 2000 - 1000 - 500 - 250 - 100 - 50	0.00	/images/placeholder.jpg	2025-11-30 22:09:53.293+03	2025-11-30 22:09:53.293+03
2266	59	مخبار مدرج سلندر بلاستيك	مخبار مدرج سلندر بلاستيك	الأحجام المتوفرة: 2000 - 1000 - 500 - 250 - 100 - 50 - 25 - 10	0.00	/images/placeholder.jpg	2025-11-30 22:09:53.298+03	2025-11-30 22:09:53.298+03
2267	59	قنينة الغسيل وشنق بوتل	قنينة الغسيل وشنق بوتل	الأحجام المتوفرة: 250 - 500 - 1000	0.00	/images/placeholder.jpg	2025-11-30 22:09:53.302+03	2025-11-30 22:09:53.302+03
2268	59	اقماع بلاستيك	اقماع بلاستيك	الأحجام المتوفرة: 120 - 100 - 90 - 75 - 60	0.00	/images/placeholder.jpg	2025-11-30 22:09:53.305+03	2025-11-30 22:09:53.305+03
2269	59	انابيب بلاستيكيه	انابيب بلاستيكيه	الأحجام المتوفرة: 5 - 10	0.00	/images/placeholder.jpg	2025-11-30 22:09:53.307+03	2025-11-30 22:09:53.307+03
2270	59	انابيب مخروطية	انابيب مخروطية	الأحجام المتوفرة: 10 - 15	0.00	/images/placeholder.jpg	2025-11-30 22:09:53.311+03	2025-11-30 22:09:53.311+03
2271	59	انابيب مخروطية مع الغطاء	انابيب مخروطية مع الغطاء		0.00	/images/placeholder.jpg	2025-11-30 22:09:53.316+03	2025-11-30 22:09:53.316+03
2272	59	راك صبغ شرائح بلاستيك	راك صبغ شرائح بلاستيك		0.00	/images/placeholder.jpg	2025-11-30 22:09:53.321+03	2025-11-30 22:09:53.321+03
2273	59	حامل انابيب اختبار زجاجية	حامل انابيب اختبار زجاجية		0.00	/images/placeholder.jpg	2025-11-30 22:09:53.323+03	2025-11-30 22:09:53.323+03
2274	50	جهاز كيمياء سبكتروفلتوميتر 295-UV دجتل	جهاز كيمياء سبكتروفلتوميتر 295-UV دجتل		0.00	/images/placeholder.jpg	2025-11-30 22:09:56.443+03	2025-11-30 22:09:56.443+03
2275	50	جهاز كيمياء سبکتر وفلتوميتر 285- دجتل	جهاز كيمياء سبکتر وفلتوميتر 285- دجتل		0.00	/images/placeholder.jpg	2025-11-30 22:09:56.465+03	2025-11-30 22:09:56.465+03
2276	50	جهاز كيمياء سبكتروفلتوميتر 722-Li	جهاز كيمياء سبكتروفلتوميتر 722-Li		0.00	/images/placeholder.jpg	2025-11-30 22:09:56.47+03	2025-11-30 22:09:56.47+03
2277	50	جهاز كيمياء كلروميتر	جهاز كيمياء كلروميتر		0.00	/images/placeholder.jpg	2025-11-30 22:09:56.475+03	2025-11-30 22:09:56.475+03
2278	50	حمام مائي 2 فتحات	حمام مائي 2 فتحات		0.00	/images/placeholder.jpg	2025-11-30 22:09:56.478+03	2025-11-30 22:09:56.478+03
2279	50	حمام مائي 4 فتحات	حمام مائي 4 فتحات		0.00	/images/placeholder.jpg	2025-11-30 22:09:56.481+03	2025-11-30 22:09:56.481+03
2280	50	حمام مائي 6 فتحات	حمام مائي 6 فتحات		0.00	/images/placeholder.jpg	2025-11-30 22:09:56.486+03	2025-11-30 22:09:56.486+03
2281	50	سنترفيوج	سنترفيوج		0.00	/images/placeholder.jpg	2025-11-30 22:09:56.49+03	2025-11-30 22:09:56.49+03
2282	50	سنترفيوج يدوي	سنترفيوج يدوي		0.00	/images/placeholder.jpg	2025-11-30 22:09:56.492+03	2025-11-30 22:09:56.492+03
2283	50	جهاز الطرد المركزي للهيماتوكريت	جهاز الطرد المركزي للهيماتوكريت		0.00	/images/placeholder.jpg	2025-11-30 22:09:56.495+03	2025-11-30 22:09:56.495+03
2284	50	سنترفيوج مع ال	سنترفيوج مع ال		0.00	/images/placeholder.jpg	2025-11-30 22:09:56.497+03	2025-11-30 22:09:56.497+03
2285	50	عداد مستعمرات كولني كاونتر	عداد مستعمرات كولني كاونتر		0.00	/images/placeholder.jpg	2025-11-30 22:09:56.501+03	2025-11-30 22:09:56.501+03
2286	50	جهاز تعقيم اوتكلاف 18 لتر - 24 لتر	جهاز تعقيم اوتكلاف 18 لتر - 24 لتر		0.00	/images/placeholder.jpg	2025-11-30 22:09:56.505+03	2025-11-30 22:09:56.505+03
2287	50	جهاز تعقيم أوتوكلاف 50 لتر	جهاز تعقيم أوتوكلاف 50 لتر		0.00	/images/placeholder.jpg	2025-11-30 22:09:56.508+03	2025-11-30 22:09:56.508+03
2288	50	جهاز تعقيم اوفن 32 لتر	جهاز تعقيم اوفن 32 لتر		0.00	/images/placeholder.jpg	2025-11-30 22:09:56.51+03	2025-11-30 22:09:56.51+03
2289	50	جهاز تعقيم اوفن 72 لتر	جهاز تعقيم اوفن 72 لتر		0.00	/images/placeholder.jpg	2025-11-30 22:09:56.512+03	2025-11-30 22:09:56.512+03
2290	50	جهاز تعقيم اوفن 28 لتر	جهاز تعقيم اوفن 28 لتر		0.00	/images/placeholder.jpg	2025-11-30 22:09:56.515+03	2025-11-30 22:09:56.515+03
2291	50	حاضنة تزيع بكتيريا انكيوبيتور 52 لتر	حاضنة تزيع بكتيريا انكيوبيتور 52 لتر		0.00	/images/placeholder.jpg	2025-11-30 22:09:56.52+03	2025-11-30 22:09:56.52+03
2292	50	حاضنة تزيع بكتيريا انكيوبيتور 28 لتر	حاضنة تزيع بكتيريا انكيوبيتور 28 لتر		0.00	/images/placeholder.jpg	2025-11-30 22:09:56.523+03	2025-11-30 22:09:56.523+03
2293	50	اجهزة تسخين وارق 250ml-500ml-1000ml	اجهزة تسخين وارق 250ml-500ml-1000ml		0.00	/images/placeholder.jpg	2025-11-30 22:09:56.525+03	2025-11-30 22:09:56.525+03
2294	50	جهاز هوت بليت	جهاز هوت بليت		0.00	/images/placeholder.jpg	2025-11-30 22:09:56.527+03	2025-11-30 22:09:56.527+03
2295	50	جهاز مغنتك ستيرر خلاط مغناطيسي	جهاز مغنتك ستيرر خلاط مغناطيسي		0.00	/images/placeholder.jpg	2025-11-30 22:09:56.53+03	2025-11-30 22:09:56.53+03
2296	52	محلول بيلروبينBILIRUBIND & T	محلول بيلروبينBILIRUBIND & T		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.619+03	2025-11-30 22:09:59.619+03
2297	52	محلول جي بي تيSGPT	محلول جي بي تيSGPT		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.635+03	2025-11-30 22:09:59.635+03
2298	52	محلول جي او تيSGOT	محلول جي او تيSGOT		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.638+03	2025-11-30 22:09:59.638+03
2299	52	محلول الكلاينALKALINE PHOSPHATASE	محلول الكلاينALKALINE PHOSPHATASE		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.641+03	2025-11-30 22:09:59.641+03
2300	52	محلول اسید فوسفاتACID PHOSPHATASE	محلول اسید فوسفاتACID PHOSPHATASE		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.645+03	2025-11-30 22:09:59.645+03
2301	52	محلول توتل بروتينTOTAL PROTEIN	محلول توتل بروتينTOTAL PROTEIN		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.65+03	2025-11-30 22:09:59.65+03
2302	52	محلول توتل بروتينTOTAL PROTEIN	محلول توتل بروتينTOTAL PROTEIN		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.653+03	2025-11-30 22:09:59.653+03
2303	52	محلول البيومينALBUMIN	محلول البيومينALBUMIN		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.655+03	2025-11-30 22:09:59.655+03
2304	52	محلول جلكوزGLUCOSE	محلول جلكوزGLUCOSE		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.656+03	2025-11-30 22:09:59.656+03
2305	52	محلول جلكوزGLUCOSE	محلول جلكوزGLUCOSE		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.658+03	2025-11-30 22:09:59.658+03
2306	52	محلول كرياتنينCREATININE	محلول كرياتنينCREATININE		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.66+03	2025-11-30 22:09:59.66+03
2307	52	محلول كرياتنينCREATININE	محلول كرياتنينCREATININE		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.664+03	2025-11-30 22:09:59.664+03
2308	52	محلول كالسيومCALCIUM	محلول كالسيومCALCIUM		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.666+03	2025-11-30 22:09:59.666+03
2309	52	محلول يوريك اسيدURIC ACID	محلول يوريك اسيدURIC ACID		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.67+03	2025-11-30 22:09:59.67+03
2310	52	محلول يورياUREA	محلول يورياUREA		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.671+03	2025-11-30 22:09:59.671+03
2311	52	محلول کلورایدCHLORIDE	محلول کلورایدCHLORIDE		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.673+03	2025-11-30 22:09:59.673+03
2312	52	محلول کلسترولCHOLESTEROL	محلول کلسترولCHOLESTEROL		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.675+03	2025-11-30 22:09:59.675+03
2313	52	محلول اتش دي ال كلسترولHDL CHOLESTEROL	محلول اتش دي ال كلسترولHDL CHOLESTEROL		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.678+03	2025-11-30 22:09:59.678+03
2314	52	محلول امیلیزTRIGLYCERIDES	محلول امیلیزTRIGLYCERIDES		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.681+03	2025-11-30 22:09:59.681+03
2315	52	محلول سي كيa-AMYLASE	محلول سي كيa-AMYLASE		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.687+03	2025-11-30 22:09:59.687+03
2316	52	محلول سي كي ام بيCK	محلول سي كي ام بيCK		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.689+03	2025-11-30 22:09:59.689+03
2317	52	محلول بوتاسيومCK-MB	محلول بوتاسيومCK-MB		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.691+03	2025-11-30 22:09:59.691+03
2318	52	محلول صوديومPOTASSIUM	محلول صوديومPOTASSIUM		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.692+03	2025-11-30 22:09:59.692+03
2319	52	محلول فسفورسSodium	محلول فسفورسSodium		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.695+03	2025-11-30 22:09:59.695+03
2320	52	محلول بي تيPHOSPHORUS	محلول بي تيPHOSPHORUS		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.698+03	2025-11-30 22:09:59.698+03
2321	52	محلول بي تي تيPT	محلول بي تي تيPT		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.701+03	2025-11-30 22:09:59.701+03
2322	52	محلول ایرونAPTT	محلول ایرونAPTT		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.704+03	2025-11-30 22:09:59.704+03
2323	52	محلول ایرونIRON	محلول ایرونIRON		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.706+03	2025-11-30 22:09:59.706+03
2324	52	محلول مغنسيومIRON+TIBC	محلول مغنسيومIRON+TIBC		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.708+03	2025-11-30 22:09:59.708+03
2325	52	محلول در ابکن 1 لترMAGNESIUM	محلول در ابکن 1 لترMAGNESIUM		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.709+03	2025-11-30 22:09:59.709+03
2326	52	Hemoglobin Hb 1L	Hemoglobin Hb 1L		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.712+03	2025-11-30 22:09:59.712+03
2327	52	محلول جلكوز 6 بي ديG-6PD	محلول جلكوز 6 بي ديG-6PD		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.716+03	2025-11-30 22:09:59.716+03
2328	52	صبغة جمساءGiemsa Stain	صبغة جمساءGiemsa Stain		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.719+03	2025-11-30 22:09:59.719+03
2329	52	صبغة جمساءGiemsa Stain	صبغة جمساءGiemsa Stain		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.722+03	2025-11-30 22:09:59.722+03
2330	52	صبغة جرامGram's Stain (A, B,C & D)	صبغة جرامGram's Stain (A, B,C & D)		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.723+03	2025-11-30 22:09:59.723+03
2331	52	صبغة زيل نلسنZiehl Nielsen stain	صبغة زيل نلسنZiehl Nielsen stain		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.724+03	2025-11-30 22:09:59.724+03
2332	52	صبغة البرتALBERT'S STAIN-A & B	صبغة البرتALBERT'S STAIN-A & B		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.726+03	2025-11-30 22:09:59.726+03
2333	52	صبغة رايتWright's Stain	صبغة رايتWright's Stain		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.728+03	2025-11-30 22:09:59.728+03
2334	52	صبغة لشمانLEISHMAN STAIN	صبغة لشمانLEISHMAN STAIN		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.732+03	2025-11-30 22:09:59.732+03
2335	52	صبغة ملاكيت جرينMalachite Green	صبغة ملاكيت جرينMalachite Green		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.735+03	2025-11-30 22:09:59.735+03
2336	52	لوجل ايودينLugol's lodine	لوجل ايودينLugol's lodine		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.738+03	2025-11-30 22:09:59.738+03
2337	52	میثايل ريدMethyl Red Indicator	میثايل ريدMethyl Red Indicator		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.74+03	2025-11-30 22:09:59.74+03
2338	52	محلول کوفکسKovacs' Reagent (Indole)	محلول کوفکسKovacs' Reagent (Indole)		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.741+03	2025-11-30 22:09:59.741+03
2339	52	زيت عدسات ميكرسكوبImmersion Oil	زيت عدسات ميكرسكوبImmersion Oil		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.743+03	2025-11-30 22:09:59.743+03
2340	52	محلول ایوسینEosin (Aqu.) 2%	محلول ایوسینEosin (Aqu.) 2%		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.746+03	2025-11-30 22:09:59.746+03
2341	52	هيما توكسلينHematoxylin	هيما توكسلينHematoxylin		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.749+03	2025-11-30 22:09:59.749+03
2342	52	لاكتو فينول كتن بلوLactophenol Cotton Blue	لاكتو فينول كتن بلوLactophenol Cotton Blue		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.751+03	2025-11-30 22:09:59.751+03
2343	52	بيكرك اسيدPicric Acid	بيكرك اسيدPicric Acid		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.754+03	2025-11-30 22:09:59.754+03
2344	52	محلول اوكسديزOxidase Reagent	محلول اوكسديزOxidase Reagent		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.756+03	2025-11-30 22:09:59.756+03
2345	52	صبغة سفرانينGrams Safranin 0.5%	صبغة سفرانينGrams Safranin 0.5%		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.758+03	2025-11-30 22:09:59.758+03
2346	52	صبغة كريستال فيلوتGrams Crystal Violet	صبغة كريستال فيلوتGrams Crystal Violet		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.76+03	2025-11-30 22:09:59.76+03
2347	52	صبغة برلينت كريزل بلوBrilliant Cresyl Blue	صبغة برلينت كريزل بلوBrilliant Cresyl Blue		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.764+03	2025-11-30 22:09:59.764+03
2348	52	کاتلیزCatalase test	کاتلیزCatalase test		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.767+03	2025-11-30 22:09:59.767+03
2349	52	كربول فيوكسينCarbol Fuchsin	كربول فيوكسينCarbol Fuchsin		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.77+03	2025-11-30 22:09:59.77+03
2350	52	جرام ایودینGram lodine	جرام ایودینGram lodine		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.772+03	2025-11-30 22:09:59.772+03
2351	52	Blood Group ABO Test	Blood Group ABO Test		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.773+03	2025-11-30 22:09:59.773+03
2352	52	فصائل دم	فصائل دم		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.775+03	2025-11-30 22:09:59.775+03
2353	52	ASO Test Kits	ASO Test Kits		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.776+03	2025-11-30 22:09:59.776+03
2354	52	CRP Test Kits	CRP Test Kits		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.78+03	2025-11-30 22:09:59.78+03
2355	52	RF Test Kits	RF Test Kits		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.784+03	2025-11-30 22:09:59.784+03
2356	52	WIDAL TEST	WIDAL TEST		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.788+03	2025-11-30 22:09:59.788+03
2357	52	ويدل	ويدل		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.789+03	2025-11-30 22:09:59.789+03
2358	52	BRUCELL-A بروسلا	BRUCELL-A بروسلا		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.791+03	2025-11-30 22:09:59.791+03
2359	52	BRUCELL-M بروسلا	BRUCELL-M بروسلا		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.792+03	2025-11-30 22:09:59.792+03
2360	52	BRUCELL-RB Rose Bengal	BRUCELL-RB Rose Bengal		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.795+03	2025-11-30 22:09:59.795+03
2361	52	بروسلا	بروسلا		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.799+03	2025-11-30 22:09:59.799+03
2362	52	ANTI HUMAN GLOBULIN (AHG)	ANTI HUMAN GLOBULIN (AHG)		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.803+03	2025-11-30 22:09:59.803+03
2363	52	Bovine Albumin 22% (BSA)	Bovine Albumin 22% (BSA)		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.806+03	2025-11-30 22:09:59.806+03
2364	52	VDRL	VDRL		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.807+03	2025-11-30 22:09:59.807+03
2365	52	RPR	RPR		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.809+03	2025-11-30 22:09:59.809+03
2366	52	Occult blood in stool (HEMOSPOT)	Occult blood in stool (HEMOSPOT)		0.00	/images/placeholder.jpg	2025-11-30 22:09:59.813+03	2025-11-30 22:09:59.813+03
2367	45	Amikacin (30 mcg)	Amikacin (30 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:02.902+03	2025-11-30 22:10:02.902+03
2368	45	Amoxycillin/Clavulanate (20/10 mcg) (30 mcg)	Amoxycillin/Clavulanate (20/10 mcg) (30 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:02.919+03	2025-11-30 22:10:02.919+03
2369	45	Ampicillin (10 mcg)	Ampicillin (10 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:02.922+03	2025-11-30 22:10:02.922+03
2370	45	Ampicillin/Cloxacillin (10 mcg)	Ampicillin/Cloxacillin (10 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:02.927+03	2025-11-30 22:10:02.927+03
2371	45	Ampicillin/Sulbactam (10x10 mcg)	Ampicillin/Sulbactam (10x10 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:02.933+03	2025-11-30 22:10:02.933+03
2372	45	Amphotericin-B (20 mcg)	Amphotericin-B (20 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:02.936+03	2025-11-30 22:10:02.936+03
2373	45	Azithromycin (15 mcg)	Azithromycin (15 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:02.939+03	2025-11-30 22:10:02.939+03
2374	45	Aztreonam (30 mcg)	Aztreonam (30 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:02.942+03	2025-11-30 22:10:02.942+03
2375	45	Bacitracin (8 units)	Bacitracin (8 units)		0.00	/images/placeholder.jpg	2025-11-30 22:10:02.95+03	2025-11-30 22:10:02.95+03
2376	45	Cefaclor (30 mcg)	Cefaclor (30 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:02.953+03	2025-11-30 22:10:02.953+03
2377	45	Cefazolin 30 mcg	Cefazolin 30 mcg		0.00	/images/placeholder.jpg	2025-11-30 22:10:02.955+03	2025-11-30 22:10:02.955+03
2378	45	Cefepime (30 mcg)	Cefepime (30 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:02.958+03	2025-11-30 22:10:02.958+03
2379	45	Cefixime (5 mcg)	Cefixime (5 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:02.962+03	2025-11-30 22:10:02.962+03
2380	45	Cefprozil (30 mcg)	Cefprozil (30 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:02.966+03	2025-11-30 22:10:02.966+03
2381	45	Cefoxitin (30 mcg)	Cefoxitin (30 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:02.969+03	2025-11-30 22:10:02.969+03
2382	45	Cefadroxil (Cephadroxil) (30 mcg)	Cefadroxil (Cephadroxil) (30 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:02.971+03	2025-11-30 22:10:02.971+03
2383	45	Ceftriaxone/Tazobactam (30/10 mcg)	Ceftriaxone/Tazobactam (30/10 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:02.975+03	2025-11-30 22:10:02.975+03
2384	45	Cefdinir (5 mcg)	Cefdinir (5 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:02.979+03	2025-11-30 22:10:02.979+03
2385	45	Ceftriaxone (30 mcg)	Ceftriaxone (30 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:02.985+03	2025-11-30 22:10:02.985+03
2386	45	Clotrimazole (10 mcg)	Clotrimazole (10 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:02.988+03	2025-11-30 22:10:02.988+03
2387	45	Cefpodoxime (10 mcg)	Cefpodoxime (10 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:02.99+03	2025-11-30 22:10:02.99+03
2388	45	Cefoperazone (75 mcg)	Cefoperazone (75 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:02.995+03	2025-11-30 22:10:02.995+03
2389	45	Cefotaxime (Cephotaxime) (30 mcg)	Cefotaxime (Cephotaxime) (30 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:02.999+03	2025-11-30 22:10:02.999+03
2390	45	Ceftazidime (30 mcg)	Ceftazidime (30 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:03.001+03	2025-11-30 22:10:03.001+03
2391	45	Ceftizoxime (30 mcg)	Ceftizoxime (30 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:03.003+03	2025-11-30 22:10:03.003+03
2392	45	Cefuroxime (30 mcg)	Cefuroxime (30 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:03.005+03	2025-11-30 22:10:03.005+03
2393	45	Cephalothin 30 mcg	Cephalothin 30 mcg		0.00	/images/placeholder.jpg	2025-11-30 22:10:03.009+03	2025-11-30 22:10:03.009+03
2394	45	Chloramphenicol (30 mcg)	Chloramphenicol (30 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:03.013+03	2025-11-30 22:10:03.013+03
2395	45	Ciprofloxacin (5 mcg)	Ciprofloxacin (5 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:03.017+03	2025-11-30 22:10:03.017+03
2396	45	Clarithromycin (15 mcg)	Clarithromycin (15 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:03.019+03	2025-11-30 22:10:03.019+03
2397	45	Clindamycin (10 mcg)	Clindamycin (10 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:03.021+03	2025-11-30 22:10:03.021+03
2398	45	Colistin (Methane Sulphonate) (10 mcg)	Colistin (Methane Sulphonate) (10 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:03.025+03	2025-11-30 22:10:03.025+03
2399	45	Co-Trimoxazole (Trimethoprim/ Sulphamethoxazole) 1.25/23.75 mcg	Co-Trimoxazole (Trimethoprim/ Sulphamethoxazole) 1.25/23.75 mcg		0.00	/images/placeholder.jpg	2025-11-30 22:10:03.03+03	2025-11-30 22:10:03.03+03
2400	45	Doxycycline (30 mcg)	Doxycycline (30 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:03.033+03	2025-11-30 22:10:03.033+03
2401	45	Ertapenem (10 mcg)	Ertapenem (10 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:03.035+03	2025-11-30 22:10:03.035+03
2402	45	Erythromycin (15 mcg)	Erythromycin (15 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:03.038+03	2025-11-30 22:10:03.038+03
2403	45	Fluconazole (10 mcg)	Fluconazole (10 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:03.041+03	2025-11-30 22:10:03.041+03
2404	45	Gentamicin (10 mcg)	Gentamicin (10 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:03.046+03	2025-11-30 22:10:03.046+03
2405	45	Gatifloxacin (5 mcg)	Gatifloxacin (5 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:03.049+03	2025-11-30 22:10:03.049+03
2406	45	Kanamycin (30 mcg)	Kanamycin (30 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:03.051+03	2025-11-30 22:10:03.051+03
2407	45	Ketoconazole (30 mcg)	Ketoconazole (30 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:03.053+03	2025-11-30 22:10:03.053+03
2408	45	Imipenem (10 mcg)	Imipenem (10 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:03.055+03	2025-11-30 22:10:03.055+03
2409	45	Itraconazole (30 mcg)	Itraconazole (30 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:03.058+03	2025-11-30 22:10:03.058+03
2410	45	Levofloxacin (5 mcg)	Levofloxacin (5 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:03.062+03	2025-11-30 22:10:03.062+03
2411	45	Linezolid (30 mcg)	Linezolid (30 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:03.066+03	2025-11-30 22:10:03.066+03
2412	45	Lincomycin (10 mcg)	Lincomycin (10 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:03.068+03	2025-11-30 22:10:03.068+03
2413	45	Lomefloxacin (10 mcg)	Lomefloxacin (10 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:03.07+03	2025-11-30 22:10:03.07+03
2414	45	Meropenem (10 mcg)	Meropenem (10 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:03.072+03	2025-11-30 22:10:03.072+03
2415	45	Moxifloxacin (5 mcg)	Moxifloxacin (5 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:03.077+03	2025-11-30 22:10:03.077+03
2416	45	Metronidazole (10 mcg)	Metronidazole (10 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:03.081+03	2025-11-30 22:10:03.081+03
2417	45	Nalidixic Acid (30 mcg)	Nalidixic Acid (30 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:03.084+03	2025-11-30 22:10:03.084+03
2418	45	Nitrofurantoin (300 mcg)	Nitrofurantoin (300 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:03.086+03	2025-11-30 22:10:03.086+03
2419	45	Novobiocin (5 mcg)	Novobiocin (5 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:03.088+03	2025-11-30 22:10:03.088+03
2420	45	Norfloxacin (10 mcg)	Norfloxacin (10 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:03.091+03	2025-11-30 22:10:03.091+03
2421	45	Nystatin (50 mcg)	Nystatin (50 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:03.096+03	2025-11-30 22:10:03.096+03
2422	45	Ofloxacin (5 mcg)	Ofloxacin (5 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:03.1+03	2025-11-30 22:10:03.1+03
2423	45	Optochin (5 mcg)	Optochin (5 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:03.102+03	2025-11-30 22:10:03.102+03
2424	45	Oxacillin (5 mcg)	Oxacillin (5 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:03.104+03	2025-11-30 22:10:03.104+03
2425	45	Oxidase Disc (50 disc)	Oxidase Disc (50 disc)		0.00	/images/placeholder.jpg	2025-11-30 22:10:03.107+03	2025-11-30 22:10:03.107+03
2426	45	Penicillin (10 units)	Penicillin (10 units)		0.00	/images/placeholder.jpg	2025-11-30 22:10:03.112+03	2025-11-30 22:10:03.112+03
2427	45	Piperacillin (100 mcg)	Piperacillin (100 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:03.116+03	2025-11-30 22:10:03.116+03
2428	45	Piperacillin/Tazobactam (100/10 mcg)	Piperacillin/Tazobactam (100/10 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:03.118+03	2025-11-30 22:10:03.118+03
2429	45	Quinupristin-dalfopristin 15 µg	Quinupristin-dalfopristin 15 µg		0.00	/images/placeholder.jpg	2025-11-30 22:10:03.12+03	2025-11-30 22:10:03.12+03
2430	45	Rifampin (5 mcg)	Rifampin (5 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:03.122+03	2025-11-30 22:10:03.122+03
2431	45	Streptomycin (25 mcg)	Streptomycin (25 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:03.128+03	2025-11-30 22:10:03.128+03
2432	45	Telithromycin 15 µg	Telithromycin 15 µg		0.00	/images/placeholder.jpg	2025-11-30 22:10:03.132+03	2025-11-30 22:10:03.132+03
2433	45	Tetracycline (30 mcg)	Tetracycline (30 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:03.134+03	2025-11-30 22:10:03.134+03
2434	45	Tobramycin (10 mcg)	Tobramycin (10 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:03.136+03	2025-11-30 22:10:03.136+03
2435	45	Trimethoprim/sulfamethoxazole 1.25 µg / 23.5 µg	Trimethoprim/sulfamethoxazole 1.25 µg / 23.5 µg		0.00	/images/placeholder.jpg	2025-11-30 22:10:03.139+03	2025-11-30 22:10:03.139+03
2436	45	Vancomycin (30 mcg)	Vancomycin (30 mcg)		0.00	/images/placeholder.jpg	2025-11-30 22:10:03.142+03	2025-11-30 22:10:03.142+03
2437	60	سلفونيك	حمض السلفونيك - مادة أساسية في صناعة المنظفات		50.00	/images/placeholder.jpg	2025-12-01 00:58:13.721+03	2025-12-01 00:58:13.721+03
2438	60	تكسابون	تكسابون - مادة فعالة للتنظيف والرغوة		45.00	/images/placeholder.jpg	2025-12-01 00:58:13.737+03	2025-12-01 00:58:13.737+03
2439	60	صابون كوري	صابون كوري عالي الجودة		35.00	/images/placeholder.jpg	2025-12-01 00:58:13.747+03	2025-12-01 00:58:13.747+03
2440	60	أديتا	أديتا - مادة مخلبية للتنظيف		40.00	/images/placeholder.jpg	2025-12-01 00:58:13.757+03	2025-12-01 00:58:13.757+03
2441	60	كلور هندي	كلور هندي - مادة تبييض ومطهرة		30.00	/images/placeholder.jpg	2025-12-01 00:58:13.766+03	2025-12-01 00:58:13.766+03
2442	60	صودا اش	صودا اش (كربونات الصوديوم)		25.00	/images/placeholder.jpg	2025-12-01 00:58:13.771+03	2025-12-01 00:58:13.771+03
2443	60	صودا كاوية	صودا كاوية (هيدروكسيد الصوديوم)		35.00	/images/placeholder.jpg	2025-12-01 00:58:13.78+03	2025-12-01 00:58:13.78+03
2444	60	ملح ليمون	ملح ليمون (حمض الستريك)		20.00	/images/placeholder.jpg	2025-12-01 00:58:13.787+03	2025-12-01 00:58:13.787+03
2445	60	ملح نقي	ملح نقي للاستخدامات الصناعية		15.00	/images/placeholder.jpg	2025-12-01 00:58:13.797+03	2025-12-01 00:58:13.797+03
2446	60	كمبرلان	كمبرلان - مادة منظفة		45.00	/images/placeholder.jpg	2025-12-01 00:58:13.803+03	2025-12-01 00:58:13.803+03
2447	60	بيتائين	بيتائين - مادة فعالة سطحياً		50.00	/images/placeholder.jpg	2025-12-01 00:58:13.81+03	2025-12-01 00:58:13.81+03
2448	60	تايلوز	تايلوز - مادة مثخنة		40.00	/images/placeholder.jpg	2025-12-01 00:58:13.817+03	2025-12-01 00:58:13.817+03
2449	61	عطر تفاح	عطر برائحة التفاح الطبيعية		30.00	/images/placeholder.jpg	2025-12-01 00:58:13.832+03	2025-12-01 00:58:13.832+03
2450	61	عطر ورد جوري	عطر برائحة الورد الجوري الفاخرة		35.00	/images/placeholder.jpg	2025-12-01 00:58:13.837+03	2025-12-01 00:58:13.837+03
2451	61	عطر خوخ	عطر برائحة الخوخ المنعشة		30.00	/images/placeholder.jpg	2025-12-01 00:58:13.844+03	2025-12-01 00:58:13.844+03
2452	61	عطر رمان	عطر برائحة الرمان الطبيعية		30.00	/images/placeholder.jpg	2025-12-01 00:58:13.851+03	2025-12-01 00:58:13.851+03
2453	61	عطر ليمون	عطر برائحة الليمون المنعشة		25.00	/images/placeholder.jpg	2025-12-01 00:58:13.855+03	2025-12-01 00:58:13.855+03
2454	61	عطر عود	عطر برائحة العود الفاخرة		50.00	/images/placeholder.jpg	2025-12-01 00:58:13.862+03	2025-12-01 00:58:13.862+03
2455	61	عطر لافندر	عطر برائحة اللافندر المهدئة		35.00	/images/placeholder.jpg	2025-12-01 00:58:13.872+03	2025-12-01 00:58:13.872+03
2456	61	عطر دوفن	عطر دوفن الفاخر		40.00	/images/placeholder.jpg	2025-12-01 00:58:13.879+03	2025-12-01 00:58:13.879+03
2457	61	عطر نعناع	عطر برائحة النعناع المنعشة		25.00	/images/placeholder.jpg	2025-12-01 00:58:13.883+03	2025-12-01 00:58:13.883+03
2458	61	عطر فراولة	عطر برائحة الفراولة الحلوة		30.00	/images/placeholder.jpg	2025-12-01 00:58:13.886+03	2025-12-01 00:58:13.886+03
2459	61	عطر برتقال	عطر برائحة البرتقال المنعشة		25.00	/images/placeholder.jpg	2025-12-01 00:58:13.888+03	2025-12-01 00:58:13.888+03
2460	61	عطر ياسمين	عطر برائحة الياسمين الطبيعية		35.00	/images/placeholder.jpg	2025-12-01 00:58:13.891+03	2025-12-01 00:58:13.891+03
2461	61	عطر برايز	عطر برايز الفاخر		40.00	/images/placeholder.jpg	2025-12-01 00:58:13.898+03	2025-12-01 00:58:13.898+03
2462	62	زيوت خام	زيوت نباتية خام طبيعية		40.00	/images/placeholder.jpg	2025-12-01 00:58:13.909+03	2025-12-01 00:58:13.909+03
2463	62	زيت الزعفران	زيت الزعفران الطبيعي		150.00	/images/placeholder.jpg	2025-12-01 00:58:13.915+03	2025-12-01 00:58:13.915+03
2464	62	زيت الورد	زيت الورد الطبيعي		80.00	/images/placeholder.jpg	2025-12-01 00:58:13.919+03	2025-12-01 00:58:13.919+03
2465	62	زيت اللافندر	زيت اللافندر العطري		60.00	/images/placeholder.jpg	2025-12-01 00:58:13.922+03	2025-12-01 00:58:13.922+03
2466	62	زيت الكافور	زيت الكافور الطبيعي		45.00	/images/placeholder.jpg	2025-12-01 00:58:13.926+03	2025-12-01 00:58:13.926+03
2467	62	زيت الزعتر	زيت الزعتر الطبيعي		50.00	/images/placeholder.jpg	2025-12-01 00:58:13.93+03	2025-12-01 00:58:13.93+03
2468	62	زيت الليمون	زيت الليمون العطري		40.00	/images/placeholder.jpg	2025-12-01 00:58:13.935+03	2025-12-01 00:58:13.935+03
2469	62	زيت النيم	زيت النيم الطبيعي		55.00	/images/placeholder.jpg	2025-12-01 00:58:13.94+03	2025-12-01 00:58:13.94+03
2470	62	زيت إكليل الجبل	زيت إكليل الجبل (روزماري)		50.00	/images/placeholder.jpg	2025-12-01 00:58:13.945+03	2025-12-01 00:58:13.945+03
2471	62	زيت اللوز الحلو	زيت اللوز الحلو الطبيعي		60.00	/images/placeholder.jpg	2025-12-01 00:58:13.949+03	2025-12-01 00:58:13.949+03
2472	62	زيت شجرة الشاي	زيت شجرة الشاي العطري		55.00	/images/placeholder.jpg	2025-12-01 00:58:13.952+03	2025-12-01 00:58:13.952+03
2473	62	زيت الكركم	زيت الكركم الطبيعي		65.00	/images/placeholder.jpg	2025-12-01 00:58:13.957+03	2025-12-01 00:58:13.957+03
2474	62	زيت الجوجوبا	زيت الجوجوبا للعناية بالبشرة		70.00	/images/placeholder.jpg	2025-12-01 00:58:13.961+03	2025-12-01 00:58:13.961+03
2475	62	زيت الخروع	زيت الخروع الطبيعي		35.00	/images/placeholder.jpg	2025-12-01 00:58:13.965+03	2025-12-01 00:58:13.965+03
2476	62	زيت الصبار	زيت الصبار (الألوفيرا)		45.00	/images/placeholder.jpg	2025-12-01 00:58:13.968+03	2025-12-01 00:58:13.968+03
2477	62	زيت الثوم	زيت الثوم الطبيعي		40.00	/images/placeholder.jpg	2025-12-01 00:58:13.971+03	2025-12-01 00:58:13.971+03
2478	62	زيت الجلسرين	زيت الجلسرين النقي		30.00	/images/placeholder.jpg	2025-12-01 00:58:13.975+03	2025-12-01 00:58:13.975+03
2479	62	زيت جوز الهند النقي	زيت جوز الهند النقي الطبيعي		50.00	/images/placeholder.jpg	2025-12-01 00:58:13.979+03	2025-12-01 00:58:13.979+03
2480	62	زيت بذور العنب	زيت بذور العنب الطبيعي		55.00	/images/placeholder.jpg	2025-12-01 00:58:13.984+03	2025-12-01 00:58:13.984+03
2481	62	زيت اللوز المر	زيت اللوز المر الطبيعي		60.00	/images/placeholder.jpg	2025-12-01 00:58:13.987+03	2025-12-01 00:58:13.987+03
2482	62	زيت البابونج	زيت البابونج المهدئ		55.00	/images/placeholder.jpg	2025-12-01 00:58:13.991+03	2025-12-01 00:58:13.991+03
2483	62	زيت القرفة	زيت القرفة العطري		50.00	/images/placeholder.jpg	2025-12-01 00:58:13.998+03	2025-12-01 00:58:13.998+03
2484	62	زيت الأوكالبتوس	زيت الأوكالبتوس الطبيعي		45.00	/images/placeholder.jpg	2025-12-01 00:58:14.002+03	2025-12-01 00:58:14.002+03
2485	62	زيت المشمش	زيت المشمش الطبيعي		60.00	/images/placeholder.jpg	2025-12-01 00:58:14.005+03	2025-12-01 00:58:14.005+03
2486	62	زيت الأرغان	زيت الأرغان المغربي الفاخر		90.00	/images/placeholder.jpg	2025-12-01 00:58:14.009+03	2025-12-01 00:58:14.009+03
2487	62	زيت النعناع	زيت النعناع العطري المنعش		40.00	/images/placeholder.jpg	2025-12-01 00:58:14.015+03	2025-12-01 00:58:14.015+03
2539	64	سلفونيك	حمض السلفونيك - مادة أساسية في صناعة المنظفات		50.00	/images/placeholder.jpg	2025-12-01 01:58:29.508+03	2025-12-01 01:58:29.508+03
2540	64	تكسابون	تكسابون - مادة فعالة للتنظيف والرغوة		45.00	/images/placeholder.jpg	2025-12-01 01:58:29.518+03	2025-12-01 01:58:29.518+03
2541	64	صابون كوري	صابون كوري عالي الجودة		35.00	/images/placeholder.jpg	2025-12-01 01:58:29.525+03	2025-12-01 01:58:29.525+03
2542	64	أديتا	أديتا - مادة مخلبية للتنظيف		40.00	/images/placeholder.jpg	2025-12-01 01:58:29.536+03	2025-12-01 01:58:29.536+03
2543	64	كلور هندي	كلور هندي - مادة تبييض ومطهرة		30.00	/images/placeholder.jpg	2025-12-01 01:58:29.541+03	2025-12-01 01:58:29.541+03
2544	64	صودا اش	صودا اش (كربونات الصوديوم)		25.00	/images/placeholder.jpg	2025-12-01 01:58:29.549+03	2025-12-01 01:58:29.549+03
2545	64	صودا كاوية	صودا كاوية (هيدروكسيد الصوديوم)		35.00	/images/placeholder.jpg	2025-12-01 01:58:29.555+03	2025-12-01 01:58:29.555+03
2546	64	ملح ليمون	ملح ليمون (حمض الستريك)		20.00	/images/placeholder.jpg	2025-12-01 01:58:29.561+03	2025-12-01 01:58:29.561+03
2547	64	ملح نقي	ملح نقي للاستخدامات الصناعية		15.00	/images/placeholder.jpg	2025-12-01 01:58:29.567+03	2025-12-01 01:58:29.567+03
2548	64	كمبرلان	كمبرلان - مادة منظفة		45.00	/images/placeholder.jpg	2025-12-01 01:58:29.571+03	2025-12-01 01:58:29.571+03
2549	64	بيتائين	بيتائين - مادة فعالة سطحياً		50.00	/images/placeholder.jpg	2025-12-01 01:58:29.574+03	2025-12-01 01:58:29.574+03
2550	64	تايلوز	تايلوز - مادة مثخنة		40.00	/images/placeholder.jpg	2025-12-01 01:58:29.578+03	2025-12-01 01:58:29.578+03
2551	65	عطر تفاح	عطر برائحة التفاح الطبيعية		30.00	/images/placeholder.jpg	2025-12-01 01:58:29.591+03	2025-12-01 01:58:29.591+03
2552	65	عطر ورد جوري	عطر برائحة الورد الجوري الفاخرة		35.00	/images/placeholder.jpg	2025-12-01 01:58:29.596+03	2025-12-01 01:58:29.596+03
2553	65	عطر خوخ	عطر برائحة الخوخ المنعشة		30.00	/images/placeholder.jpg	2025-12-01 01:58:29.6+03	2025-12-01 01:58:29.6+03
2554	65	عطر رمان	عطر برائحة الرمان الطبيعية		30.00	/images/placeholder.jpg	2025-12-01 01:58:29.603+03	2025-12-01 01:58:29.603+03
2555	65	عطر ليمون	عطر برائحة الليمون المنعشة		25.00	/images/placeholder.jpg	2025-12-01 01:58:29.609+03	2025-12-01 01:58:29.609+03
2556	65	عطر عود	عطر برائحة العود الفاخرة		50.00	/images/placeholder.jpg	2025-12-01 01:58:29.622+03	2025-12-01 01:58:29.622+03
2557	65	عطر لافندر	عطر برائحة اللافندر المهدئة		35.00	/images/placeholder.jpg	2025-12-01 01:58:29.626+03	2025-12-01 01:58:29.626+03
2558	65	عطر دوفن	عطر دوفن الفاخر		40.00	/images/placeholder.jpg	2025-12-01 01:58:29.636+03	2025-12-01 01:58:29.636+03
2559	65	عطر نعناع	عطر برائحة النعناع المنعشة		25.00	/images/placeholder.jpg	2025-12-01 01:58:29.643+03	2025-12-01 01:58:29.643+03
2560	65	عطر فراولة	عطر برائحة الفراولة الحلوة		30.00	/images/placeholder.jpg	2025-12-01 01:58:29.65+03	2025-12-01 01:58:29.65+03
2561	65	عطر برتقال	عطر برائحة البرتقال المنعشة		25.00	/images/placeholder.jpg	2025-12-01 01:58:29.655+03	2025-12-01 01:58:29.655+03
2562	65	عطر ياسمين	عطر برائحة الياسمين الطبيعية		35.00	/images/placeholder.jpg	2025-12-01 01:58:29.66+03	2025-12-01 01:58:29.66+03
2563	65	عطر برايز	عطر برايز الفاخر		40.00	/images/placeholder.jpg	2025-12-01 01:58:29.666+03	2025-12-01 01:58:29.666+03
2564	66	زيوت خام	زيوت نباتية خام طبيعية		40.00	/images/placeholder.jpg	2025-12-01 01:58:29.676+03	2025-12-01 01:58:29.676+03
2565	66	زيت الزعفران	زيت الزعفران الطبيعي		150.00	/images/placeholder.jpg	2025-12-01 01:58:29.682+03	2025-12-01 01:58:29.682+03
2566	66	زيت الورد	زيت الورد الطبيعي		80.00	/images/placeholder.jpg	2025-12-01 01:58:29.688+03	2025-12-01 01:58:29.688+03
2567	66	زيت اللافندر	زيت اللافندر العطري		60.00	/images/placeholder.jpg	2025-12-01 01:58:29.693+03	2025-12-01 01:58:29.693+03
2568	66	زيت الكافور	زيت الكافور الطبيعي		45.00	/images/placeholder.jpg	2025-12-01 01:58:29.698+03	2025-12-01 01:58:29.698+03
2569	66	زيت الزعتر	زيت الزعتر الطبيعي		50.00	/images/placeholder.jpg	2025-12-01 01:58:29.702+03	2025-12-01 01:58:29.702+03
2570	66	زيت الليمون	زيت الليمون العطري		40.00	/images/placeholder.jpg	2025-12-01 01:58:29.707+03	2025-12-01 01:58:29.707+03
2571	66	زيت النيم	زيت النيم الطبيعي		55.00	/images/placeholder.jpg	2025-12-01 01:58:29.711+03	2025-12-01 01:58:29.711+03
2572	66	زيت إكليل الجبل	زيت إكليل الجبل (روزماري)		50.00	/images/placeholder.jpg	2025-12-01 01:58:29.715+03	2025-12-01 01:58:29.715+03
2573	66	زيت اللوز الحلو	زيت اللوز الحلو الطبيعي		60.00	/images/placeholder.jpg	2025-12-01 01:58:29.719+03	2025-12-01 01:58:29.719+03
2574	66	زيت شجرة الشاي	زيت شجرة الشاي العطري		55.00	/images/placeholder.jpg	2025-12-01 01:58:29.722+03	2025-12-01 01:58:29.722+03
2575	66	زيت الكركم	زيت الكركم الطبيعي		65.00	/images/placeholder.jpg	2025-12-01 01:58:29.726+03	2025-12-01 01:58:29.726+03
2576	66	زيت الجوجوبا	زيت الجوجوبا للعناية بالبشرة		70.00	/images/placeholder.jpg	2025-12-01 01:58:29.731+03	2025-12-01 01:58:29.731+03
2577	66	زيت الخروع	زيت الخروع الطبيعي		35.00	/images/placeholder.jpg	2025-12-01 01:58:29.735+03	2025-12-01 01:58:29.735+03
2578	66	زيت الصبار	زيت الصبار (الألوفيرا)		45.00	/images/placeholder.jpg	2025-12-01 01:58:29.74+03	2025-12-01 01:58:29.74+03
2579	66	زيت الثوم	زيت الثوم الطبيعي		40.00	/images/placeholder.jpg	2025-12-01 01:58:29.743+03	2025-12-01 01:58:29.743+03
2580	66	زيت الجلسرين	زيت الجلسرين النقي		30.00	/images/placeholder.jpg	2025-12-01 01:58:29.749+03	2025-12-01 01:58:29.749+03
2581	66	زيت جوز الهند النقي	زيت جوز الهند النقي الطبيعي		50.00	/images/placeholder.jpg	2025-12-01 01:58:29.753+03	2025-12-01 01:58:29.753+03
2582	66	زيت بذور العنب	زيت بذور العنب الطبيعي		55.00	/images/placeholder.jpg	2025-12-01 01:58:29.756+03	2025-12-01 01:58:29.756+03
2583	66	زيت اللوز المر	زيت اللوز المر الطبيعي		60.00	/images/placeholder.jpg	2025-12-01 01:58:29.76+03	2025-12-01 01:58:29.76+03
2584	66	زيت البابونج	زيت البابونج المهدئ		55.00	/images/placeholder.jpg	2025-12-01 01:58:29.766+03	2025-12-01 01:58:29.766+03
2585	66	زيت القرفة	زيت القرفة العطري		50.00	/images/placeholder.jpg	2025-12-01 01:58:29.77+03	2025-12-01 01:58:29.77+03
2586	66	زيت الأوكالبتوس	زيت الأوكالبتوس الطبيعي		45.00	/images/placeholder.jpg	2025-12-01 01:58:29.773+03	2025-12-01 01:58:29.773+03
2587	66	زيت المشمش	زيت المشمش الطبيعي		60.00	/images/placeholder.jpg	2025-12-01 01:58:29.776+03	2025-12-01 01:58:29.776+03
2588	66	زيت الأرغان	زيت الأرغان المغربي الفاخر		90.00	/images/placeholder.jpg	2025-12-01 01:58:29.78+03	2025-12-01 01:58:29.78+03
2589	66	زيت النعناع	زيت النعناع العطري المنعش		40.00	/images/placeholder.jpg	2025-12-01 01:58:29.783+03	2025-12-01 01:58:29.783+03
2590	67	Life-size skeleton 180CM Tall	Model: XC-101		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.012632+03	2025-12-01 02:55:33.012632+03
2591	67	Skeleton with Muscles and Ligaments 180CM Tall	Model: XC-101A		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.04527+03	2025-12-01 02:55:33.04527+03
2592	67	85CM Skeleton	Model: XC-102		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.047165+03	2025-12-01 02:55:33.047165+03
2593	67	85CM Skeleton with Spinal Nerves	Model: XC-102A		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.051341+03	2025-12-01 02:55:33.051341+03
2594	67	85M Skeleton with Nerves and Blood Vessels	Model: XC-102B		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.057308+03	2025-12-01 02:55:33.057308+03
2595	67	85CM Skeleton with Painted Muscles	Model: XC-102C		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.060658+03	2025-12-01 02:55:33.060658+03
2596	67	45CM Mini Skeleton	Model: XC-103		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.062569+03	2025-12-01 02:55:33.062569+03
2597	67	Life-Size Skull	Model: XC-104		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.065462+03	2025-12-01 02:55:33.065462+03
2598	67	Head with Brain	Model: XC-318B		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.069546+03	2025-12-01 02:55:33.069546+03
2599	67	Median Section of the Head	Model: XC-319		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.071457+03	2025-12-01 02:55:33.071457+03
2600	67	Frontal and Median Section of the Head	Model: XC-319A		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.073986+03	2025-12-01 02:55:33.073986+03
2601	67	Frontal Section of the Head	Model: XC-319B		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.076903+03	2025-12-01 02:55:33.076903+03
2602	67	Larynx, Heart and Lung Model	Model: XC-320		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.079164+03	2025-12-01 02:55:33.079164+03
2603	67	Lung Model (4 parts)	Model: XC-321		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.083175+03	2025-12-01 02:55:33.083175+03
2604	67	Model of the Head	Model: XC-324		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.085533+03	2025-12-01 02:55:33.085533+03
2605	67	Nerves of Neck Region	Model: XC-324B		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.090126+03	2025-12-01 02:55:33.090126+03
2606	67	Palm Anatomy	Model: XC-325		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.09313+03	2025-12-01 02:55:33.09313+03
2607	67	Normal, Flat and Arched Foot	Model: XC-326		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.09537+03	2025-12-01 02:55:33.09537+03
2608	67	Foot Anatomical Model	Model: XC-326A		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.097474+03	2025-12-01 02:55:33.097474+03
2609	67	Foot Section Model	Model: XC-326B		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.101096+03	2025-12-01 02:55:33.101096+03
2610	67	Model of the Transparent Lung Segment	Model: XC-330		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.103766+03	2025-12-01 02:55:33.103766+03
2611	67	Female Pelvis Model	Model: XC-332D		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.106768+03	2025-12-01 02:55:33.106768+03
2612	67	Urinary System Model	Model: XC-333		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.10914+03	2025-12-01 02:55:33.10914+03
2613	67	80CM Human Muscle Model Male (27 parts)	Model: XC-334		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.112141+03	2025-12-01 02:55:33.112141+03
2614	67	50CM Human Muscle Model Male (1 part)	Model: XC-335		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.114982+03	2025-12-01 02:55:33.114982+03
2615	67	Muscle of Human Arm (7 parts)	Model: XC-336		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.117537+03	2025-12-01 02:55:33.117537+03
2616	67	Muscle of Human Leg (13 parts)	Model: XC-337		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.12018+03	2025-12-01 02:55:33.12018+03
2617	67	Life-size Human Muscle Foot Model (7 parts)	Model: XC-338		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.122394+03	2025-12-01 02:55:33.122394+03
2618	67	Life-Size Skull with Painted Muscles	Model: XC-104B		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.125279+03	2025-12-01 02:55:33.125279+03
2619	67	Life-Size Skull with Colored Bones	Model: XC-104C		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.127858+03	2025-12-01 02:55:33.127858+03
2620	67	Deluxe Life-Size Skull Style D	Model: XC-104D		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.129395+03	2025-12-01 02:55:33.129395+03
2621	67	Skull Model with 8 Parts Brain	Model: XC-104E		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.131621+03	2025-12-01 02:55:33.131621+03
2622	67	Miniature Plastic Skull	Model: XC-106		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.133816+03	2025-12-01 02:55:33.133816+03
2623	67	Life-size Vertebral Column	Model: XC-107		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.136196+03	2025-12-01 02:55:33.136196+03
2624	67	Vertebral Column with Painted Muscles	Model: XC-107A		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.13866+03	2025-12-01 02:55:33.13866+03
2625	67	Didactic Vertebral Column	Model: XC-107C		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.140797+03	2025-12-01 02:55:33.140797+03
2626	67	Life Size Shoulder Joint	Model: XC-109		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.143123+03	2025-12-01 02:55:33.143123+03
2627	67	Life Size Muscled Shoulder Joint	Model: XC-109A		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.144836+03	2025-12-01 02:55:33.144836+03
2628	67	Life-size Hip Joint	Model: XC-110		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.146642+03	2025-12-01 02:55:33.146642+03
2629	67	Life-size Knee Joint	Model: XC-111		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.148729+03	2025-12-01 02:55:33.148729+03
2630	67	Life-size Elbow Joint	Model: XC-112		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.151027+03	2025-12-01 02:55:33.151027+03
2631	67	Life-size Foot Joint	Model: XC-113		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.152499+03	2025-12-01 02:55:33.152499+03
2632	67	Life-size Foot Joint with Ligaments	Model: XC-113A		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.154191+03	2025-12-01 02:55:33.154191+03
2633	67	Life-size Hand Joint	Model: XC-114		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.15656+03	2025-12-01 02:55:33.15656+03
2634	67	Life-size Hand Joint with Ligaments	Model: XC-114A		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.159229+03	2025-12-01 02:55:33.159229+03
2635	67	Life-size Pelvis with 5pcs Lumbar Vertebrae	Model: XC-115		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.16153+03	2025-12-01 02:55:33.16153+03
2636	67	Half-size Pelvis with 5pcs Lumbar Vertebrae	Model: XC-115A		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.16503+03	2025-12-01 02:55:33.16503+03
2637	67	Lumbar Set (2 pcs)	Model: XC-116		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.167223+03	2025-12-01 02:55:33.167223+03
2638	67	Lumbar Set (3 pcs)	Model: XC-117		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.170177+03	2025-12-01 02:55:33.170177+03
2639	67	Lumbar Set (4 pcs)	Model: XC-118		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.172949+03	2025-12-01 02:55:33.172949+03
2640	67	Life-size Lumbar Vertebrae with Sacrum & Coccyx and Herniated Disc	Model: XC-119		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.17466+03	2025-12-01 02:55:33.17466+03
2641	67	Mini Lumbar Vertebrae with Sacrum & Coccyx and Herniated Disc	Model: XC-119A		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.178063+03	2025-12-01 02:55:33.178063+03
2642	67	Thoracic Spinal Column	Model: XC-120		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.179556+03	2025-12-01 02:55:33.179556+03
2643	67	Life-size Upper Extremity (In pairs)	Model: XC-121		0.00	/images/placeholder.jpg	2025-12-01 02:55:33.180896+03	2025-12-01 02:55:33.180896+03
2644	54	ميكرسكوب تعليمي	ميكرسكوب تعليمي		0.00	/images/placeholder.jpg	2025-12-01 03:08:22.370233+03	2025-12-01 03:08:22.370233+03
2645	54	حقيبة الذرات العضوية	حقيبة الذرات العضوية		0.00	/images/placeholder.jpg	2025-12-01 03:08:22.38286+03	2025-12-01 03:08:22.38286+03
2646	54	جلفانومتر	جلفانومتر		0.00	/images/placeholder.jpg	2025-12-01 03:08:22.385294+03	2025-12-01 03:08:22.385294+03
2647	54	الفولتاميتر	الفولتاميتر		0.00	/images/placeholder.jpg	2025-12-01 03:08:22.389239+03	2025-12-01 03:08:22.389239+03
2648	54	الأميتر	الأميتر		0.00	/images/placeholder.jpg	2025-12-01 03:08:22.393336+03	2025-12-01 03:08:22.393336+03
2649	54	منشور زجاجي	منشور زجاجي		0.00	/images/placeholder.jpg	2025-12-01 03:08:22.396306+03	2025-12-01 03:08:22.396306+03
2650	54	مستطيل زجاجي	مستطيل زجاجي		0.00	/images/placeholder.jpg	2025-12-01 03:08:22.399173+03	2025-12-01 03:08:22.399173+03
2651	54	أنبوبة اشعة الكاثود	أنبوبة اشعة الكاثود		0.00	/images/placeholder.jpg	2025-12-01 03:08:22.402381+03	2025-12-01 03:08:22.402381+03
2652	54	توصيل المعادن للحرارة	توصيل المعادن للحرارة		0.00	/images/placeholder.jpg	2025-12-01 03:08:22.405273+03	2025-12-01 03:08:22.405273+03
2653	54	ثاقب سدادات	ثاقب سدادات		0.00	/images/placeholder.jpg	2025-12-01 03:08:22.409779+03	2025-12-01 03:08:22.409779+03
2654	56	مجسم الجمجمة	مجسم الجمجمة		0.00	/images/placeholder.jpg	2025-12-01 03:08:22.412467+03	2025-12-01 03:08:22.412467+03
2655	56	مجسم الجلد	مجسم الجلد		0.00	/images/placeholder.jpg	2025-12-01 03:08:22.415839+03	2025-12-01 03:08:22.415839+03
2656	56	الجهاز التناسلي للرجل	الجهاز التناسلي للرجل		0.00	/images/placeholder.jpg	2025-12-01 03:08:22.41812+03	2025-12-01 03:08:22.41812+03
2657	56	الجهاز التناسلي للمرأة	الجهاز التناسلي للمرأة		0.00	/images/placeholder.jpg	2025-12-01 03:08:22.419913+03	2025-12-01 03:08:22.419913+03
2658	56	مجسم نصف انسان جميع اعضاء الجسم 85سم	مجسم نصف انسان جميع اعضاء الجسم 85سم		0.00	/images/placeholder.jpg	2025-12-01 03:08:22.42181+03	2025-12-01 03:08:22.42181+03
2659	56	مجسم نصف انسان جميع اعضاء الجسم 45سم	مجسم نصف انسان جميع اعضاء الجسم 45سم		0.00	/images/placeholder.jpg	2025-12-01 03:08:22.425776+03	2025-12-01 03:08:22.425776+03
2660	56	مجسم الجهاز التنفسي	مجسم الجهاز التنفسي		0.00	/images/placeholder.jpg	2025-12-01 03:08:22.427952+03	2025-12-01 03:08:22.427952+03
2661	54	ميكرسكوب تعليمي	ميكرسكوب تعليمي		0.00	/images/placeholder.jpg	2025-12-01 03:35:40.40752+03	2025-12-01 03:35:40.40752+03
2662	54	حقيبة الذرات العضوية	حقيبة الذرات العضوية		0.00	/images/placeholder.jpg	2025-12-01 03:35:40.422579+03	2025-12-01 03:35:40.422579+03
2663	54	جلفانومتر	جلفانومتر		0.00	/images/placeholder.jpg	2025-12-01 03:35:40.427085+03	2025-12-01 03:35:40.427085+03
2664	54	الفولتاميتر	الفولتاميتر		0.00	/images/placeholder.jpg	2025-12-01 03:35:40.431079+03	2025-12-01 03:35:40.431079+03
2665	54	الأميتر	الأميتر		0.00	/images/placeholder.jpg	2025-12-01 03:35:40.433268+03	2025-12-01 03:35:40.433268+03
2666	54	منشور زجاجي	منشور زجاجي		0.00	/images/placeholder.jpg	2025-12-01 03:35:40.436364+03	2025-12-01 03:35:40.436364+03
2667	54	مستطيل زجاجي	مستطيل زجاجي		0.00	/images/placeholder.jpg	2025-12-01 03:35:40.438964+03	2025-12-01 03:35:40.438964+03
2668	54	أنبوبة اشعة الكاثود	أنبوبة اشعة الكاثود		0.00	/images/placeholder.jpg	2025-12-01 03:35:40.443402+03	2025-12-01 03:35:40.443402+03
2669	54	توصيل المعادن للحرارة	توصيل المعادن للحرارة		0.00	/images/placeholder.jpg	2025-12-01 03:35:40.445632+03	2025-12-01 03:35:40.445632+03
2670	54	ثاقب سدادات	ثاقب سدادات		0.00	/images/placeholder.jpg	2025-12-01 03:35:40.449282+03	2025-12-01 03:35:40.449282+03
2671	56	مجسم فك الأسنان	مجسم فك الأسنان		0.00	/images/placeholder.jpg	2025-12-01 03:35:40.451996+03	2025-12-01 03:35:40.451996+03
2672	56	مجسم الجمجمة	مجسم الجمجمة		0.00	/images/placeholder.jpg	2025-12-01 03:35:40.453739+03	2025-12-01 03:35:40.453739+03
2673	56	مجسم الجلد	مجسم الجلد		0.00	/images/placeholder.jpg	2025-12-01 03:35:40.45606+03	2025-12-01 03:35:40.45606+03
2674	56	الجهاز التناسلي للرجل	الجهاز التناسلي للرجل		0.00	/images/placeholder.jpg	2025-12-01 03:35:40.461132+03	2025-12-01 03:35:40.461132+03
2675	56	الجهاز التناسلي للمرأة	الجهاز التناسلي للمرأة		0.00	/images/placeholder.jpg	2025-12-01 03:35:40.465277+03	2025-12-01 03:35:40.465277+03
2676	56	مجسم نصف انسان جميع اعضاء الجسم 85سم	مجسم نصف انسان جميع اعضاء الجسم 85سم		0.00	/images/placeholder.jpg	2025-12-01 03:35:40.46696+03	2025-12-01 03:35:40.46696+03
2677	56	مجسم نصف انسان جميع اعضاء الجسم 45سم	مجسم نصف انسان جميع اعضاء الجسم 45سم		0.00	/images/placeholder.jpg	2025-12-01 03:35:40.468481+03	2025-12-01 03:35:40.468481+03
2678	56	مجسم الجهاز التنفسي	مجسم الجهاز التنفسي		0.00	/images/placeholder.jpg	2025-12-01 03:35:40.470844+03	2025-12-01 03:35:40.470844+03
\.


--
-- Data for Name: sub_categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sub_categories (id, "categoryId", name, "createdAt", "updatedAt", image) FROM stdin;
47	26	مستلزمات استهلاكية	2025-11-30 19:48:19.955+03	2025-12-01 02:24:14.888+03	/uploads/image-1764545054023-814902088.jpg
45	25	أوساط زراعية	2025-11-30 19:48:19.948+03	2025-12-01 02:24:26.51+03	/uploads/image-1764545064932-892444275.jpg
56	29	أحياء	2025-11-30 19:48:19.983+03	2025-12-01 02:24:52.785+03	/uploads/image-1764545090482-766240351.jpg
54	29	فيزياء	2025-11-30 19:48:19.977+03	2025-12-01 02:25:08.714+03	/uploads/image-1764545106895-518784242.jpg
67	29	مجسمات	2025-12-01 02:25:34.086+03	2025-12-01 02:25:34.086+03	/images/placeholder.jpg
44	25	كيماويات مخبرية	2025-11-30 19:48:19.942+03	2025-11-30 19:48:19.942+03	/images/placeholder.jpg
48	26	أجهزة ومعدات طبية	2025-11-30 19:48:19.96+03	2025-11-30 19:48:19.96+03	/images/placeholder.jpg
49	26	أثاث وكراسي معاقين	2025-11-30 19:48:19.963+03	2025-11-30 19:48:19.963+03	/images/placeholder.jpg
50	27	أجهزة مخبرية	2025-11-30 19:48:19.965+03	2025-11-30 19:48:19.965+03	/images/placeholder.jpg
51	27	زجاجات بلاستيك	2025-11-30 19:48:19.969+03	2025-11-30 19:48:19.969+03	/images/placeholder.jpg
52	27	محاليل وكواشف	2025-11-30 19:48:19.971+03	2025-11-30 19:48:19.971+03	/images/placeholder.jpg
53	28	أجهزة قياس عامة	2025-11-30 19:48:19.974+03	2025-11-30 19:48:19.974+03	/images/placeholder.jpg
55	29	معامل تشريح	2025-11-30 19:48:19.979+03	2025-11-30 19:48:19.979+03	/images/placeholder.jpg
58	25	المنظفات ومستحضرات التجميل	2025-11-30 20:44:12.977+03	2025-11-30 20:44:12.977+03	/images/placeholder.jpg
59	27	زجاجيات مخبرية	2025-11-30 20:44:21.546+03	2025-11-30 20:44:21.546+03	/images/placeholder.jpg
60	28	مواد صناعة المنظفات	2025-12-01 00:58:13.66+03	2025-12-01 00:58:13.66+03	/images/placeholder.jpg
61	28	العطور والروائح	2025-12-01 00:58:13.823+03	2025-12-01 00:58:13.823+03	/images/placeholder.jpg
62	28	زيوت نباتية	2025-12-01 00:58:13.904+03	2025-12-01 00:58:13.904+03	/images/placeholder.jpg
66	25	المنظفات ومستحضرات التجميل (الزيوت النباتية)	2025-12-01 01:58:29.672+03	2025-12-01 02:16:21.021+03	/images/placeholder.jpg
65	25	المنظفات ومستحضرات التجميل (العطور والروائح)	2025-12-01 01:58:29.585+03	2025-12-01 02:16:48.926+03	/images/placeholder.jpg
64	25	المنظفات ومستحضرات التجميل (مواد صناعة المنظفات)	2025-12-01 01:58:29.479+03	2025-12-01 02:17:07.653+03	/images/placeholder.jpg
57	25	مواد كيميائية	2025-11-30 20:44:04.707+03	2025-12-01 02:24:00.977+03	/uploads/image-1764545040131-105548679.jpg
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, password, role, "createdAt", "updatedAt") FROM stdin;
5	admin	admin@waqif.com	$2a$10$B7mG985jVxuwapx.PdGOKO7NXAjKbrra3a9kM2Aq1RVVx/6tEfFvC	admin	2025-11-30 19:48:19.745+03	2025-11-30 19:48:19.745+03
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 29, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 2678, true);


--
-- Name: sub_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sub_categories_id_seq', 67, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 5, true);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: sub_categories sub_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sub_categories
    ADD CONSTRAINT sub_categories_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: products_name; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_name ON public.products USING btree (name);


--
-- Name: products_sub_category_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_sub_category_id ON public.products USING btree ("subCategoryId");


--
-- Name: sub_categories_category_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX sub_categories_category_id ON public.sub_categories USING btree ("categoryId");


--
-- Name: products products_subCategoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "products_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES public.sub_categories(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: sub_categories sub_categories_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sub_categories
    ADD CONSTRAINT "sub_categories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict yK8CxMDXuIYPwLtxVm8ww5pYrLqJVFLLUfD4ZYNWL1T7C0uzTAm5Suo9EYnXQGI

