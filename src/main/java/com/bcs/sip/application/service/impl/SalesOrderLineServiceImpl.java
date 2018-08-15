package com.bcs.sip.application.service.impl;

import com.bcs.sip.application.service.SalesOrderLineService;
import com.bcs.sip.application.domain.SalesOrderLine;
import com.bcs.sip.application.repository.SalesOrderLineRepository;
import com.bcs.sip.application.service.dto.SalesOrderLineDTO;
import com.bcs.sip.application.service.mapper.SalesOrderLineMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
/**
 * Service Implementation for managing SalesOrderLine.
 */
@Service
@Transactional
public class SalesOrderLineServiceImpl implements SalesOrderLineService {

    private final Logger log = LoggerFactory.getLogger(SalesOrderLineServiceImpl.class);

    private final SalesOrderLineRepository salesOrderLineRepository;

    private final SalesOrderLineMapper salesOrderLineMapper;

    public SalesOrderLineServiceImpl(SalesOrderLineRepository salesOrderLineRepository, SalesOrderLineMapper salesOrderLineMapper) {
        this.salesOrderLineRepository = salesOrderLineRepository;
        this.salesOrderLineMapper = salesOrderLineMapper;
    }

    /**
     * Save a salesOrderLine.
     *
     * @param salesOrderLineDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public SalesOrderLineDTO save(SalesOrderLineDTO salesOrderLineDTO) {
        log.debug("Request to save SalesOrderLine : {}", salesOrderLineDTO);
        SalesOrderLine salesOrderLine = salesOrderLineMapper.toEntity(salesOrderLineDTO);
        salesOrderLine = salesOrderLineRepository.save(salesOrderLine);
        return salesOrderLineMapper.toDto(salesOrderLine);
    }

    /**
     * Get all the salesOrderLines.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<SalesOrderLineDTO> findAll(Pageable pageable) {
        log.debug("Request to get all SalesOrderLines");
        return salesOrderLineRepository.findAll(pageable)
            .map(salesOrderLineMapper::toDto);
    }


    /**
     * Get one salesOrderLine by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<SalesOrderLineDTO> findOne(Long id) {
        log.debug("Request to get SalesOrderLine : {}", id);
        return salesOrderLineRepository.findById(id)
            .map(salesOrderLineMapper::toDto);
    }

    /**
     * Delete the salesOrderLine by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete SalesOrderLine : {}", id);
        salesOrderLineRepository.deleteById(id);
    }
}
