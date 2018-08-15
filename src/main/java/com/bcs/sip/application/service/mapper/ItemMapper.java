package com.bcs.sip.application.service.mapper;

import com.bcs.sip.application.domain.*;
import com.bcs.sip.application.service.dto.ItemDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Item and its DTO ItemDTO.
 */
@Mapper(componentModel = "spring", uses = {CategoryMapper.class})
public interface ItemMapper extends EntityMapper<ItemDTO, Item> {

    @Mapping(source = "category.id", target = "categoryId")
    ItemDTO toDto(Item item);

    @Mapping(source = "categoryId", target = "category")
    Item toEntity(ItemDTO itemDTO);

    default Item fromId(Long id) {
        if (id == null) {
            return null;
        }
        Item item = new Item();
        item.setId(id);
        return item;
    }
}
