package com.bcs.sip.application.service.mapper;

import com.bcs.sip.application.domain.*;
import com.bcs.sip.application.service.dto.SalesOrderLineDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity SalesOrderLine and its DTO SalesOrderLineDTO.
 */
@Mapper(componentModel = "spring", uses = {SalesOrderMapper.class, SKUMapper.class})
public interface SalesOrderLineMapper extends EntityMapper<SalesOrderLineDTO, SalesOrderLine> {

    @Mapping(source = "salesOrder.id", target = "salesOrderId")
    @Mapping(source = "sku.id", target = "skuId")
    SalesOrderLineDTO toDto(SalesOrderLine salesOrderLine);

    @Mapping(source = "salesOrderId", target = "salesOrder")
    @Mapping(source = "skuId", target = "sku")
    SalesOrderLine toEntity(SalesOrderLineDTO salesOrderLineDTO);

    default SalesOrderLine fromId(Long id) {
        if (id == null) {
            return null;
        }
        SalesOrderLine salesOrderLine = new SalesOrderLine();
        salesOrderLine.setId(id);
        return salesOrderLine;
    }
}
