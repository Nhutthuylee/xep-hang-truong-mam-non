import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    useTable, useSortBy,
    useFilters,
} from 'react-table';
import { Table } from 'reactstrap';
import { Filter, DefaultColumnFilter } from './filters';
const CardTableComment = (props) => {
    const { columns, data } = props;
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns, data,
        defaultColumn: { Filter: DefaultColumnFilter },
    },
        useFilters,
        useSortBy
    );
    const generateSortingIndicator = (column) => {
        return column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : '';
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
                                </Fragment>
                            );
                        })}
                    </tbody>
                </Table>
            </Fragment>
        </>
    );
};

export default CardTableComment;