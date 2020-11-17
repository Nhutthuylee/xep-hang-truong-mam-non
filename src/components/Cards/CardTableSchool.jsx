import React, { Fragment } from "react";
import PropTypes from "prop-types";


import 'bootstrap/dist/css/bootstrap.min.css';
import {
    useTable, useSortBy,
    useFilters,
    useExpanded
} from 'react-table';
import { Table } from 'reactstrap';
import { Filter, DefaultColumnFilter } from './filters';
import CardDetailSchool from "./CardDetailSchool";

export default function CardTableSchool(props) {
    const { columns, data } = props;

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        visibleColumns,
    } = useTable({
        columns, data,
        defaultColumn: { Filter: DefaultColumnFilter },
    },
        useFilters,
        useSortBy,
        useExpanded,
    );
    const generateSortingIndicator = (column) => {
        return column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : '';
    };
    const renderRowSubComponent = (row) => {
        const data = row.original;
        // setInputs(name, address_);
        return (
            <>
                <CardDetailSchool data={data} refetchData={props.refetchData} />
            </>);
    };

    return (
        <>
            <Fragment>
                <Table bordered hover {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>
                                        <div {...column.getSortByToggleProps()}>

                                            {column.render('Header')}
                                            {generateSortingIndicator(column)}
                                        </div>
                                        <Filter column={column} />
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody {...getTableBodyProps()}>
                        {rows.map((row) => {
                            prepareRow(row);
                            return (
                                <Fragment key={row.getRowProps().key}>
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map((cell) => {
                                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;

                                        })}
                                    </tr>
                                    {row.isExpanded && (
                                        <tr>
                                            <td colSpan={visibleColumns.length}>
                                                {renderRowSubComponent(row)}
                                            </td>
                                        </tr>
                                    )}
                                </Fragment>
                            );
                        })}
                    </tbody>
                </Table>
            </Fragment>
        </>
    );
}

CardTableSchool.defaultProps = {
    color: "light",
    columns: [],
    data: [],
    renderRowSubComponent: null,

};

CardTableSchool.propTypes = {
    color: PropTypes.oneOf(["light", "dark"]),
    columns: PropTypes.array,
    data: PropTypes.array,
    total: PropTypes.string,
    renderRowSubComponent: PropTypes.func
};
