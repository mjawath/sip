package com.bcs.sip.application.service.mapper;

import com.bcs.sip.application.domain.*;
import com.bcs.sip.application.service.dto.SalesOrderDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity SalesOrder and its DTO SalesOrderDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SalesOrderMapper extends EntityMapper<SalesOrderDTO, SalesOrder> {


    @Mapping(target = "lineItems", ignore = true)
    SalesOrder toEntity(SalesOrderDTO salesOrderDTO);

    default SalesOrder fromId(Long id) {
        if (id == null) {
            return null;
        }
        SalesOrder salesOrder = new SalesOrder();
        salesOrder.setId(id);
        return salesOrder;
    }
}
